var obj = {}
for(var i=1; i<=7; i++){
	for(var j=1; j<=24; j++){
		var key = String(i)+String(j)
		// console.log(key)
		var push = '{"' +key + '": { "day": '+ i + ', "hour": ' + j + ', "value": 0 }}'
		push = JSON.parse(push)
		obj.push(push)
	}
}

	template = JSON.stringify(obj);
	template = JSON.parse(template);

// {11: { day: 1, hour: 1, value: 0 },
//  12: { day: 1, hour: 2, value: 0 },
//  13: { day: 1, hour: 3, value: 0 },
//  14: { day: 1, hour: 4, value: 0 },
//  15: { day: 1, hour: 5, value: 0 }
//  724: 

 console.log((template))