import time
import sys
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


def wait():
    while not w.can_make_request():
        time.sleep(1)

def get_id(summoner_name):
    wait()
    s = w.get_summoner(name=summoner_name)
    return s

def main():
  if sys.argv[2] == 'get_id':
    data = get_id(summoner_name)
    print(data['id'])



if __name__ == '__main__':
    main()