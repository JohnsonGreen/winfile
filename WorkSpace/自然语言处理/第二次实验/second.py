# -*- coding: UTF-8 -*-

import nltk

# text = nltk.word_tokenize("And now for something completely different") 
# print nltk.pos_tag(text)

# text = nltk.Text(word.lower() for word in nltk.corpus.brown.words()) 
# print text.similar('bought')
# print text.similar('family')
# print text.similar('through')

# raw = 'I do not like purple eggs and flower, and I also do not like her.' 
# tokens = nltk.word_tokenize(raw)
# default_tagger = nltk.DefaultTagger('NN') 
# print default_tagger.tag(tokens) 


# from nltk.corpus import brown 

# brown_tagged_sents = brown.tagged_sents(categories='news') 
# fd = nltk.FreqDist(brown.words(categories='news')) 
# cfd = nltk.ConditionalFreqDist(brown.tagged_words(categories='news')) 
# most_freq_words = fd.keys()[:100]
# likely_tags = dict((word, cfd[word].max()) for word in most_freq_words) 
# baseline_tagger = nltk.UnigramTagger(model=likely_tags) 
# print baseline_tagger.evaluate(brown_tagged_sents) 


# from nltk.corpus import brown 

# brown_tagged_sents = brown.tagged_sents(categories='news') 
# brown_sents = brown.sents(categories='news') 
# unigram_tagger = nltk.UnigramTagger(brown_tagged_sents)
# unigram_tagger.tag(brown_sents[2007])

# print unigram_tagger.evaluate(brown_tagged_sents) 


# from nltk.corpus import brown 

# brown_tagged_sents = brown.tagged_sents(categories='news') 
# size = int(len(brown_tagged_sents) * 0.5)
# train_sents = brown_tagged_sents[:size] 
# test_sents = brown_tagged_sents[size:] 
# unigram_tagger = nltk.UnigramTagger(train_sents) 
# print unigram_tagger.evaluate(test_sents) 

from nltk.corpus import brown 
brown_tagged_sents = brown.tagged_sents(categories='news') 
brown_sents = brown.sents(categories='news') 
size = int(len(brown_tagged_sents) * 0.5)
train_sents = brown_tagged_sents[:size]
test_sents = brown_tagged_sents[size:] 
bigram_tagger = nltk.BigramTagger(train_sents) 
bigram_tagger.tag(brown_sents[2007])
unseen_sent = brown_sents[4203] 
bigram_tagger.tag(unseen_sent) 
print bigram_tagger.evaluate(test_sents) 