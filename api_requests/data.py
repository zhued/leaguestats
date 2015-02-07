import time
import sys
import json
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


#Utilities
def wait():
    while not w.can_make_request():
        time.sleep(1)


def to_json(dict):
  return json.dumps(dict,separators=(',', ': '))

#Data functions
def get_summoner(summoner_name):
    wait()
    s = w.get_summoner(name=summoner_name)
    return s


#MAIN
def main():
  arg = sys.argv[2]
  if arg == 'get_summoner':
    data = get_summoner(summoner_name)
    print(to_json(data))



if __name__ == '__main__':
    main()