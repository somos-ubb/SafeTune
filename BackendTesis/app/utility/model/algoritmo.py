# -*- coding: utf-8 -*-
# PARTE 1: TODOS LOS IMPORT NECESARIOS
import sys
import torch
from torch import nn
import re
from nltk.corpus import stopwords
from transformers import BertTokenizer, BertModel
from langdetect import detect

model_state_path =  "app/utility/model/best_state/best_model_state.bin"
tokenizer = BertTokenizer.from_pretrained('app/utility/model/tokenizer')
bert_model = BertModel.from_pretrained('app/utility/model/bert')
model_state = torch.load(str(model_state_path))
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

song = sys.argv[1]

def detect_language(text):
    try:
        detected_language = detect(text)
        return detected_language
    except Exception as e:
        print("An error occurred:", e)
        return None

# PARTE 2: INICIALIZAR MODELO Y CALZARLO CON EL MEJOR ESTADO

class SentimentClassifier(nn.Module):
    def __init__(self, n_classes):
        super(SentimentClassifier, self).__init__()
        self.bert = bert_model
        self.drop = nn.Dropout(p=0.3)
        self.out = nn.Linear(self.bert.config.hidden_size, n_classes)
    def forward(self, input_ids, attention_mask):
        bert_output = self.bert(
            input_ids=input_ids,
            attention_mask=attention_mask
        )
        pooled_output = bert_output.pooler_output
        # agregar una capa de dropout
        output = self.drop(pooled_output)
        return self.out(output)

model = SentimentClassifier(2)

model.load_state_dict(model_state)

# PARTE 3: LIMPIAR CARACTERES DE LA CANCION

def filter(cancion):
    # Remove special characters and punctuation
    cleaned_text = re.sub(r'[^\w\sáéíóúüñ]', '', cancion)
    # Convert to lowercase
    cleaned_text = cleaned_text.lower()
    # English stopwords
    english_stop_words = set(stopwords.words('english'))
    # Spanish stopwords
    spanish_stop_words = set(stopwords.words('spanish'))
    # Combine both sets of stopwords
    all_stop_words = english_stop_words.union(spanish_stop_words)
    filtered_lyrics = ' '.join([word for word in cleaned_text.split() if word not in all_stop_words])
    return filtered_lyrics

# PARTE 4: TOKENIZAR LA CANCION

def tokenize(song):
    # Filter and split the song lyrics into words
    words = song.split()

    # Initialize variables
    encoded_chunks = []
    max_chunk_length = 512
    
    # Calculate number of chunks needed
    total_words = len(words)
    num_chunks = (total_words + max_chunk_length - 1) // max_chunk_length
    
    if num_chunks == 0:
        return []
    else:
        chunk_length = total_words // num_chunks
    remainder = total_words % num_chunks  # Handles uneven distribution of words
    
    start_index = 0
    for _ in range(num_chunks):
        # Adjust chunk length if there's a remainder
        if remainder > 0:
            remainder -= 1
            current_chunk_length = chunk_length + 1
        else:
            current_chunk_length = chunk_length
        
        # Define the end index of the current chunk
        end_index = start_index + current_chunk_length
        
        # Extract words for the current chunk
        current_chunk_words = words[start_index:end_index]
        
        # Join the words to form the chunk
        current_chunk = ' '.join(current_chunk_words)
        
        # Tokenize the current chunk
        encoded_chunk = tokenizer.encode_plus(current_chunk.strip(), padding='max_length', truncation=True, return_token_type_ids=False, pad_to_max_length=True, max_length=max_chunk_length, return_attention_mask=True, return_tensors='pt')
        encoded_chunks.append(encoded_chunk)
        
        # Update the start index for the next chunk
        start_index = end_index

    return encoded_chunks

# PARTE 5: EVALUAR LA CANCION EN EL MODELO PARA QUE ME DE UN RESULTADO

def evaluate(song):
    # Put the model in evaluation mode
    filter_song = filter(song)
    if not filter_song:
        return 0
    language = detect_language(filter_song)
    preds_list = []
    # Convert tokenized inputs to PyTorch tensors
    tokenized_song = tokenize(filter_song)
    model.eval()
    for chunk in tokenized_song:
        input_ids = chunk['input_ids'].to(device)
        attention_mask = chunk['attention_mask'].to(device)

        # Make predictions
        with torch.no_grad():
            outputs = model(input_ids, attention_mask=attention_mask)  # Unsqueeze to add batch dimension
            _, preds = torch.max(outputs, dim=1)

        preds_list.append(preds)
    # Sum all the predictions
    total_preds = sum([pred.sum().item() for pred in preds_list])

    # Convert the sum to a boolean value
    es_violenta = total_preds > 0
    return '{} {}'.format(int(es_violenta), language)

if song:
    print(evaluate(song))
else:
    print(0)
