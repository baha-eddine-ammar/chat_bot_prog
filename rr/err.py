from langchain.document_loaders import PyPDFLoader
loader=PyPDFLoader('attention.pdf')
docs=loader.load()
docs