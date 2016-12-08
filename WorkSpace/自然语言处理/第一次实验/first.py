
# -*- coding: UTF-8 -*-
 
#print "hehehe";



# #利用布朗语料库，对news类型问题进行计数
# import nltk

# from nltk.corpus import brown 
	
# news_text = brown.words(categories='news')                   #选择'news'文本
# fdist = nltk.FreqDist([w.lower() for w in news_text])       #将单词转换为小写，FreqDist统计这篇文章各个词的词频
# modals = ['can', 'could', 'may', 'might', 'must', 'will','what','when','where','who','why']

# for m in modals: 
#   print m + ':', fdist[m],        #末尾,表示后续内容连续加在后面而不换行




# #统计六类文体目标词汇最常出现的分别是什么
# import nltk

# from nltk.corpus import brown

# cfd = nltk.ConditionalFreqDist(           #ConditionalFreqDist()以一个配对链表作为输入，保存在一个变量cfd
#     (genre,word)                         #配对序列,每对的形式是：（条件，事件），本例为（文体，单词）
#     for genre in brown.categories()      #文体范围 
#     for word in brown.words(categories=genre))   #对应文体中的每个单词

# genres = ['news', 'religion', 'hobbies', 'science_fiction', 'romance', 'humor'] 
# modals = ['can', 'could', 'may', 'might', 'must', 'will', 'what', 'when', 'where', 'who', 'why'] 

# cfd.tabulate(conditions=genres, samples=modals)               #为条件频率分布制表 

# print cfd['religion']                          #可以直接访问，为FreqDist
# print cfd['religion']['can']                   #输出can在文体religion中的频数



#  古腾堡语料库
#编号2554文本《罪与罚》中，截取第153-175字符
import nltk

from nltk.corpus import gutenberg




