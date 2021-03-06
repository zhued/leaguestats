import time
import sys
import json
import itertools

from pulldata import RiotWatcher, NORTH_AMERICA

# make file called .riotkey and store api key there on first line
with open('.riotkey') as f:
    content = f.readlines()

if len(sys.argv) < 3:
    print 'Please give a summoner name as argument!'
    exit()


key = content[0]
# if summoner doesnt have ranked teams, teams tests will fail
# if summoner doesnt have ranked stats, stats tests will fail
# these are not graceful failures, so try to use a summoner that has them

#summoner_name will also act as the champion/item id position
summoner_name = sys.argv[1]
# if sys.argv[2] == 'get_recent_games':
#   iteration = int(sys.argv[3])
#   if iteration > 9 :
#     print 'Iteration must be between 0-9'
#     exit()

w = RiotWatcher(key)


'''
Utility Functions
'''
def wait():
    while not w.can_make_request():
        time.sleep(1)


def to_json(dict):
  return json.dumps(dict,separators=(',', ': '))

'''
Data functions
'''
def get_summoner(summoner_name):
  wait()
  s = w.get_summoner(name=summoner_name)
  return s

def get_summoner_formated(summoner_name):
  wait()
  s = w.get_summoner(name=summoner_name)
  what = []
  sum_id = s['id']
  sum_name = s['name']
  formatJSON = '{"_id":{ "oid": %d}, "summoner_id": %d, "summoner_name": "%s", "summoner_short": "%s"}' % (sum_id,sum_id,sum_name,summoner_name)
  formatted = json.loads(formatJSON)
  what.append(formatted)
  return what

def get_match_history(summoner):
  wait()
  ms = w.get_match_history(summoner['id'])
  return ms['matches']

# gets the average creeps per minute for the past 9 games
def get_average_creep_per_minute_deltas(summoner):
  wait()
  matches = w.get_match_history(summoner['id'])
  match_info = matches['matches']
  total = []
  for i in xrange(0,len(match_info)):
    participantDict = match_info[i]['participants'][0]
    creepsPerMinDeltas = participantDict['timeline']['creepsPerMinDeltas']
    total.append(creepsPerMinDeltas.values())
  mergedTotal = list(itertools.chain(*total))
  average = sum(mergedTotal)/len(mergedTotal)
  return average

# get average gold per minute
def get_average_gold_per_minute_deltas(summoner):
  wait()
  matches = w.get_match_history(summoner['id'])
  match_info = matches['matches']
  total = []
  for i in xrange(0,len(match_info)):
    participantDict = match_info[i]['participants'][0]
    goldPerMinDeltas = participantDict['timeline']['goldPerMinDeltas']
    total.append(goldPerMinDeltas.values())
  mergedTotal = list(itertools.chain(*total))
  average = sum(mergedTotal)/len(mergedTotal)
  return average

# get average xp per min
def get_average_xp_per_minute_deltas(summoner):
  wait()
  matches = w.get_match_history(summoner['id'])
  match_info = matches['matches']
  total = []
  for i in xrange(0,len(match_info)):
    participantDict = match_info[i]['participants'][0]
    xpPerMinDeltas = participantDict['timeline']['xpPerMinDeltas']
    total.append(xpPerMinDeltas.values())
  mergedTotal = list(itertools.chain(*total))
  average = sum(mergedTotal)/len(mergedTotal)
  return average


def get_average_kda_per_game(summoner):
  wait()
  matches = w.get_match_history(summoner['id'])
  match_info = matches['matches']
  total = 0
  for i in xrange(0,len(match_info)):
    participantDict = match_info[i]['participants'][0]
    kaPerGame = (participantDict['stats']['kills'] + participantDict['stats']['assists'])
    if participantDict['stats']['deaths'] == 0:
      dPerGame = 1.0
    else:
      dPerGame = participantDict['stats']['deaths']
    kdaPerGame = float(kaPerGame)/float(dPerGame)
    total += kdaPerGame
  average = total/len(match_info)
  return average


def get_average_stats(summoner):
  wait()
  matches = w.get_match_history(summoner['id'])
  match_info = matches['matches']

  length = len(match_info)

  creepTotal = []
  goldTotal = []
  xpTotal = []
  kdaTotal = 0
  for i in xrange(0,len(match_info)):
    participantDict = match_info[i]['participants'][0]
    creepsPerMinDeltas = participantDict['timeline']['creepsPerMinDeltas']
    goldPerMinDeltas = participantDict['timeline']['goldPerMinDeltas']
    xpPerMinDeltas = participantDict['timeline']['xpPerMinDeltas']
    
    kaPerGame = (participantDict['stats']['kills'] + participantDict['stats']['assists'])
    if participantDict['stats']['deaths'] == 0:
      dPerGame = 1.0
    else:
      dPerGame = participantDict['stats']['deaths']
    kdaPerGame = float(kaPerGame)/float(dPerGame)
    kdaTotal += kdaPerGame


    creepTotal.append(creepsPerMinDeltas.values())
    goldTotal.append(goldPerMinDeltas.values())
    xpTotal.append(xpPerMinDeltas.values())

  creepTotal = list(itertools.chain(*creepTotal))
  goldTotal = list(itertools.chain(*goldTotal))
  xpTotal = list(itertools.chain(*xpTotal))

  creepAverage = sum(creepTotal)/len(creepTotal)
  goldAverage = sum(goldTotal)/len(goldTotal)
  xpAverage = sum(xpTotal)/len(xpTotal)
  kdaAverage = kdaTotal/length

  jsonDict = {}
  jsonDict["creepAverage"] = creepAverage
  jsonDict["goldAverage"] = goldAverage
  jsonDict["xpAverage"] = xpAverage
  jsonDict["kdaAverage"] = kdaAverage

  return jsonDict

# ***********************
#    times of recent games
# ***********************
def get_recent_games(summoner):
  wait()
  total = []
  gamedata = w.get_recent_games(summoner['id'])
  summoner_id = summoner['id']
  for i in xrange(0,len(gamedata['games'])):
    gameid = gamedata['games'][i]['gameId']
    gameEnd = gamedata['games'][i]['createDate']
    timePlayed = gamedata['games'][i]['stats']['timePlayed']
    game_sum_id = int(str(gameid) + str(summoner_id))
    formatJSON = '{"_id":{ "oid": %d}, "gameEndtime": %d, "timePlayed": %d, "summoner_id": %d, "game_id": %d}' % (game_sum_id,gameEnd,timePlayed,summoner_id,gameid)
    j = json.loads(formatJSON)
    total.append(j)
  return total

# ***********************
#    times of ALL ranked games
# ***********************
def ranked_indexed(summoner, total, beginIndex, endIndex):
  wait()
  cont = 1
  summoner_id = summoner['id']
  ms = w.get_match_history(summoner['id'], None, None, None, beginIndex, endIndex)
  if not ms:
      return 0, total
  elif len(ms['matches']) < 15:
      cont = 0

  for i in xrange(0,len(ms['matches'])):
    gameid = ms['matches'][i]['matchId']
    timePlayed = ms['matches'][i]['matchDuration']
    gameEnd = ms['matches'][i]['matchCreation'] + (ms['matches'][i]['matchDuration'])*1000 + 300000
    game_sum_id = int(str(gameid) + str(summoner_id))
    formatJSON = '{"_id":{ "oid": %d}, "gameEndtime": %d, "timePlayed": %d, "summoner_id": %d, "game_id": %d}' % (game_sum_id,gameEnd,timePlayed,summoner_id,gameid)
    j = json.loads(formatJSON)
    total.append(j)
  return cont, total

def get_all_ranked(summoner, beginIndex, endIndex):
  total = []
  cont = 1
  while cont == 1:
    beginIndex += 15
    endIndex += 15
    ret = ranked_indexed(summoner, total, beginIndex, endIndex)
    cont = ret[0]
  return total

# **********
# STATIC DATA
# ************
def get_static_all_champs():
  wait()
  ms = w.static_get_champion_list()
  return ms

def get_static_champ(champ_id):
  wait()
  ms = w.static_get_champion(champ_id)
  return ms


'''
MAIN
'''
def main():
  arg = sys.argv[2]
  if arg == 'get_summoner':
    summoner = get_summoner(summoner_name)
    print(to_json(summoner))
  elif arg == 'get_recent_games':
    summoner = get_summoner(summoner_name)
    matchHistory = get_recent_games(summoner)
    print(to_json(matchHistory))
  elif arg == 'get_summoner_formated':
    summoner = get_summoner_formated(summoner_name)
    print(to_json(summoner))
  elif arg == 'get_all_ranked':
    summoner = get_summoner(summoner_name)
    matchHistory = get_all_ranked(summoner, 0, 15)
    print(to_json(matchHistory))
  # elif arg == 'get_match_history':
  #   summoner = get_summoner(summoner_name)
  #   matchHistory = get_match_history(summoner)
  #   print(to_json(matchHistory))
  # elif arg == 'get_average_creep_per_minute_deltas':
  #   summoner = get_summoner(summoner_name)
  #   average = get_average_creep_per_minute_deltas(summoner)
  #   print average
  # elif arg == 'get_average_gold_per_minute_deltas':
  #   summoner = get_summoner(summoner_name)
  #   average = get_average_gold_per_minute_deltas(summoner)
  #   print average
  # elif arg == 'get_average_xp_per_minute_deltas':
  #   summoner = get_summoner(summoner_name)
  #   average = get_average_xp_per_minute_deltas(summoner)
  #   print average
  # elif arg == 'get_average_kda_per_game':
  #   summoner = get_summoner(summoner_name)
  #   average = get_average_kda_per_game(summoner)
  #   print average
  # elif arg == 'get_average_stats':
  #   summoner = get_summoner(summoner_name)
  #   averages = get_average_stats(summoner)
  #   print (to_json(averages))

# ************
# Start of static data
# ************
  elif arg == 'get_static_all_champs':
    champs = get_static_all_champs()
    print (to_json(champs))
  elif arg == 'get_static_champ':
    champ_name = summoner_name
    champ = get_static_champ(champ_name)
    print (to_json(champ))



if __name__ == '__main__':
    main()