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
summoner_name = sys.argv[1]

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


'''
MAIN
'''
def main():
  arg = sys.argv[2]
  if arg == 'get_summoner':
    summoner = get_summoner(summoner_name)
    print(to_json(summoner))
  elif arg == 'get_match_history':
    summoner = get_summoner(summoner_name)
    matchHistory = get_match_history(summoner)
    print(to_json(matchHistory))
  elif arg == 'get_average_creep_per_minute_deltas':
    summoner = get_summoner(summoner_name)
    average = get_average_creep_per_minute_deltas(summoner)
    print average
  elif arg == 'get_average_gold_per_minute_deltas':
    summoner = get_summoner(summoner_name)
    average = get_average_gold_per_minute_deltas(summoner)
    print average
  elif arg == 'get_average_xp_per_minute_deltas':
    summoner = get_summoner(summoner_name)
    average = get_average_xp_per_minute_deltas(summoner)
    print average



if __name__ == '__main__':
    main()