from transformers import BertTokenizer, BertModel
MODEL_NAME = 'dccuchile/bert-base-spanish-wwm-cased'
bert = BertModel.from_pretrained(MODEL_NAME)
tokenizer = BertTokenizer.from_pretrained(MODEL_NAME)
bert.save_pretrained('app/utility/model/bert')
tokenizer.save_pretrained('app/utility/model/tokenizer')