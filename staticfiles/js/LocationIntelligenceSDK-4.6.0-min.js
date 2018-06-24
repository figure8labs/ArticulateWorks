var GEOAPIS_V1=GEOAPIS_V1||{};GEOAPIS_V1.baseService=function(a){this.accessToken="Bearer "+a;this.apiAddress="https://api.pitneybowes.com/location-intelligence";this.response={}};GEOAPIS_V1.baseService.prototype.callApi=function(c){var a=null;this.response={};this.response.httpResponse={};try{a=$.ajax({url:this.apiAddress+c,type:"GET",async:false,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}});this.response.response=JSON.parse(a.responseText);if(a.status===200){this.response.status="success"}else{this.response.status="failed"}}catch(b){this.response.status="failed";if(a.responseText!==""){this.response.response=a.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}}this.response.httpResponse.status=a.status;this.response.httpResponse.statusText=a.statusText};GEOAPIS_V1.baseService.prototype.callApiAsync=function(a,b){$.ajax({url:this.apiAddress+a,type:"GET",async:true,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}}).done(function(d,c,f){this.response={};this.response.httpResponse={};this.response.httpResponse.status=f.status;this.response.httpResponse.statusText=f.statusText;this.response.response=JSON.parse(f.responseText);if(f.status===200){this.response.status="success"}else{this.response.status="failed"}if(b!==undefined&&b!==null){var e=b;e(this.response)}else{alert("Callback are not available.")}}).fail(function(f,c,e){this.response={};this.response.status="failed";this.response.httpResponse={};this.response.httpResponse.status=f.status;this.response.httpResponse.statusText=f.statusText;if(f.responseText!==""){this.response.response=f.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}if(b!==undefined&&b!==null){var d=b;d(this.response)}else{alert("Callback are not available.")}})};GEOAPIS_V1.baseService.prototype.callPostApi=function(d,a){var b=null;this.response={};this.response.httpResponse={};try{b=$.ajax({url:this.apiAddress+d,type:"POST",data:a,async:false,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}});this.response.response=JSON.parse(b.responseText);if(b.status===200){this.response.status="success"}else{this.response.status="failed"}}catch(c){this.response.status="failed";if(b.responseText!==""){this.response.response=b.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}}this.response.httpResponse.status=b.status;this.response.httpResponse.statusText=b.statusText};GEOAPIS_V1.baseService.prototype.callPostApiAsync=function(b,a,c){$.ajax({url:this.apiAddress+b,type:"POST",data:a,async:true,headers:{"Content-type":"application/json",Accept:"application/json",Authorization:this.accessToken}}).done(function(e,d,g){this.response={};this.response.httpResponse={};this.response.httpResponse.status=g.status;this.response.httpResponse.statusText=g.statusText;this.response.response=JSON.parse(g.responseText);if(g.status===200){this.response.status="success"}else{this.response.status="failed"}if(c!==undefined&&c!==null){var f=c;f(this.response)}else{alert("Callback are not available.")}}).fail(function(g,d,f){this.response={};this.response.status="failed";this.response.httpResponse={};this.response.httpResponse.status=g.status;this.response.httpResponse.statusText=g.statusText;if(g.responseText!==""){this.response.response=g.responseText}else{this.response.response={};this.response.response.errors=[];this.response.response.errors.push({errorCode:"GE0001",errorDescription:"Internal server error encountered."})}if(c!==undefined&&c!==null){var e=c;e(this.response)}else{alert("Callback are not available.")}})};GEOAPIS_V1.baseService.prototype.apiGetUrl=function(d,b,c){for(var a in d){if(b.indexOf(a)>=0){if(d[a]!==null&&d[a]!==undefined){c+=this.queryDelimiter(c)+a+"="+encodeURIComponent(d[a])}}}return c};GEOAPIS_V1.baseService.prototype.queryDelimiter=function(b){var a="&";if(b.search("\\?")<0){a="?"}return a};function GEOAPIS_V1_INHERIT(c,a){var b=new c();a.prototype=b;a.prototype.constructor=a}GEOAPIS_V1.geo911=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geo911);GEOAPIS_V1.geo911.prototype.getPSAPByAddress=function(b,c){var a="/geo911/v1/psap/byaddress?address="+encodeURIComponent(b.address);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geo911.prototype.getPSAPByLocation=function(b,c){var a="/geo911/v1/psap/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geo911.prototype.getAHJPLUSPSAPByAddress=function(b,c){var a="/geo911/v1/ahj-psap/byaddress?address="+encodeURIComponent(b.address);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geo911.prototype.getAHJPLUSPSAPByLocation=function(b,c){var a="/geo911/v1/ahj-psap/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoCode=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoCode);GEOAPIS_V1.geoCode.prototype.getCapabilities=function(c,d){var b="/geocode-service/v1/transient/"+encodeURIComponent(c.bundleType)+"/capabilities",a=["country","operation"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoCode.prototype.getConfigureDictionary=function(c,d){var b="/geocode-service/v1/transient/"+encodeURIComponent(c.bundleType)+"/dictionaries",a=["country"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoCode.prototype.getGeocode=function(c,d){var b="/geocode-service/v1/transient/"+encodeURIComponent(c.bundleType)+"/geocode",a=["country","mainAddress","placeName","lastLine","areaName1","areaName2","areaName3","areaName4","postCode1","postCode2","matchMode","fallbackGeo","fallbackPostal","maxCands","streetOffset","streetOffsetUnits","cornerOffset","cornerOffsetUnits"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoCode.prototype.getReverseGeocode=function(c,d){var b="/geocode-service/v1/transient/"+encodeURIComponent(c.bundleType)+"/reverseGeocode?x="+encodeURIComponent(c.x)+"&y="+encodeURIComponent(c.y),a=["country","coordSysName","distance","distanceUnits"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoCode.prototype.getGeocodeAdvanced=function(c,d){var b="/geocode-service/v1/transient/"+encodeURIComponent(c.bundleType)+"/geocode",a='{"type": "'+c.type+'", "preferences":'+c.preferences+', "addresses":'+c.addresses+"}";if(d!==undefined){this.callPostApiAsync(b,a,d)}else{this.callPostApi(b,a);return this.response}};GEOAPIS_V1.geoCode.prototype.getReverseGeocodeAdvance=function(c,d){var b="/geocode-service/v1/transient/"+encodeURIComponent(c.bundleType)+"/reverseGeocode",a='{"preferences":'+c.preferences+', "points":'+c.points+"}";if(d!==undefined){this.callPostApiAsync(b,a,d)}else{this.callPostApi(b,a);return this.response}};GEOAPIS_V1.geoCode.prototype.getPbKeyByAddress=function(b,c){var a="/geocode-service/v1/key/byaddress?address="+encodeURIComponent(b.address);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoCode.prototype.getPbKeyByAddressAdvance=function(b,c){var a="/geocode-service/v1/key/byaddress";postData='{"addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoComm=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoComm);GEOAPIS_V1.geoComm.prototype.getRateCenterByAddress=function(c,d){var b="/geocomm/v1/ratecenter/byaddress?address="+encodeURIComponent(c.address),a=["level","country","areaCodeInfo"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoComm.prototype.getRateCenterByLocation=function(c,d){var b="/geocomm/v1/ratecenter/bylocation?latitude="+encodeURIComponent(c.latitude)+"&longitude="+encodeURIComponent(c.longitude),a=["level","areaCodeInfo"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoEnrich=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoEnrich);GEOAPIS_V1.geoEnrich.prototype.getAddress=function(c,d){var b="/geoenrich/v1/address/bylocation?latitude="+encodeURIComponent(c.latitude)+"&longitude="+encodeURIComponent(c.longitude),a=["searchRadius","searchRadiusUnit"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoEnrich.prototype.getPlace=function(c,d){var b="/geoenrich/v1/place/bylocation?latitude="+encodeURIComponent(c.latitude)+"&longitude="+encodeURIComponent(c.longitude),a=["levelHint"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoEnrich.prototype.getPOI=function(c,d){var b="/geoenrich/v1/poi/bylocation?latitude="+encodeURIComponent(c.latitude)+"&longitude="+encodeURIComponent(c.longitude),a=["category","searchRadius","maxCandidates","searchRadiusUnit","searchPriority","searchDataset","brandName","travelTime","travelTimeUnit","travelDistance","travelDistanceUnit","mode"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoLife=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoLife);GEOAPIS_V1.geoLife.prototype.getDemographicByAddress=function(c,d){var b="/geolife/v1/demographics/byaddress?address="+encodeURIComponent(c.address),a=["filter","profile","country"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoLife.prototype.getDemographicByLocation=function(c,d){var b="/geolife/v1/demographics/bylocation?latitude="+encodeURIComponent(c.latitude)+"&longitude="+encodeURIComponent(c.longitude),a=["filter","profile"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoLife.prototype.getSegmentationByAddress=function(c,d){var b="/geolife/v1/segmentation/byaddress?address="+encodeURIComponent(c.address),a=["country"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoLife.prototype.getSegmentationByLocation=function(b,c){var a="/geolife/v1/segmentation/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoLocation=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoLocation);GEOAPIS_V1.geoLocation.prototype.getLocationByFixedLine=function(b,c){var a="/geolocation/v1/location/byfixedline?deviceId="+encodeURIComponent(b.deviceId);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoLocation.prototype.getLocationByIPAddress=function(b,c){var a="/geolocation/v1/location/byipaddress?ipAddress="+encodeURIComponent(b.ipAddress);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoLocation.prototype.getLocationByWiFiAccessPoint=function(b,c){var a="/geolocation/v1/location/byaccesspoint?mac="+encodeURIComponent(b.mac);optionalList=["ssid","rsid","speed","accessPoint"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoLocation.prototype.getDeviceStatus=function(b,c){var a="/geolocation/v1/devicestatus?deviceId="+encodeURIComponent(b.deviceId);optionalList=["includeNetworkInfo"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoMap=function(a){GEOAPIS_V1.baseService.call(this,"");this.apiKey=a};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoMap);GEOAPIS_V1.geoMap.prototype.getGeoMap=function(b,a){$("#"+a).html("");$("<div></div>",{id:"geoAPI-geoMap-raster"}).appendTo("#"+a);$("<div></div>",{id:"geoAPI-geoMap-raster-logo"}).appendTo("#"+a);$("#geoAPI-geoMap-raster").css("position","absolute");$("#geoAPI-geoMap-raster").css("width","100%");$("#geoAPI-geoMap-raster").css("height","100%");$("<img/>",{src:"https://developer2.pitneybowes.com/en/pitneyboweslogo.png"}).appendTo("#geoAPI-geoMap-raster-logo");$("#geoAPI-geoMap-raster-logo").css("position","absolute");$("#geoAPI-geoMap-raster-logo").css("bottom","0px");$("#geoAPI-geoMap-raster-logo").css("z-index","4");var c=L.map("geoAPI-geoMap-raster");c.setView([b.latitude,b.longitude],b.zoom);return c};GEOAPIS_V1.geoMap.prototype.getGeoMapRaster=function(a,b){var d="bronze",c,e;if(b=="bronze"||b=="iron"||b=="steel"){d=b}c=this.apiAddress+"/geomap/v1/tile/osm/{z}/{x}/{y}.png?api_key="+this.apiKey+"&theme="+d;e=L.tileLayer(c,{attribution:'<a target="_blank" href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>'}).addTo(a);return a};GEOAPIS_V1.geoMap.prototype.getGeoMapVector=function(a,b){var c="bronze",d;if(b=="bronze"||b=="iron"||b=="steel"){c=b}d=Tangram.leafletLayer({scene:"resources/"+c+".yaml",attribution:'<a target="_blank" href="http://www.openstreetmap.org/copyright">&copy; OpenStreetMap contributors</a>',introspection:true}).addTo(a);return a};GEOAPIS_V1.geoPost=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoPost);GEOAPIS_V1.geoPost.prototype.getCarrierRouteByAddress=function(b,c){var a="/geopost/v1/carrierroute/byaddress?address="+encodeURIComponent(b.address);optionalList=["includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoPost.prototype.getAdvancedCarrierRouteByAddress=function(b,c){var a="/geopost/v1/carrierroute/byaddress";postData='{"preferences":'+b.preferences+', "addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoProperty=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoProperty);GEOAPIS_V1.geoProperty.prototype.getGeoPropertyByAddress=function(b,c){var a="/geoproperty/v1/"+encodeURIComponent(b.category)+"/attributes/byaddress?address="+encodeURIComponent(b.address);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoProperty.prototype.getGeoPropertyByAddressBatch=function(b,c){var a="/geoproperty/v1/"+encodeURIComponent(b.category)+"/attributes/byaddress";postData='{"addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoProperty.prototype.getGeoPropertyByPBKey=function(b,c){var a="/geoproperty/v1/"+encodeURIComponent(b.category)+"/attributes/bypbkey?pbKey="+encodeURIComponent(b.pbKey);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoProperty.prototype.getGeoPropertyByPBKeyBatch=function(b,c){var a="/geoproperty/v1/"+encodeURIComponent(b.category)+"/attributes/bypbkey";postData='{"pbkeys":'+b.pbkeys+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoRisk);GEOAPIS_V1.geoRisk.prototype.getCrimeRiskByAddress=function(b,c){var a="/georisk/v1/crime/byaddress?address="+encodeURIComponent(b.address);optionalList=["type","includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedCrimeRiskByAddress=function(b,c){var a="/georisk/v1/crime/byaddress";postData='{"preferences":'+b.preferences+', "addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getCrimeRiskByLocation=function(b,c){var a="/georisk/v1/crime/bylocation?longitude="+encodeURIComponent(b.longitude)+"&latitude="+encodeURIComponent(b.latitude);optionalList=["type","includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedCrimeRiskByLocation=function(b,c){var a="/georisk/v1/crime/bylocation";postData='{"preferences":'+b.preferences+', "locations":'+b.locations+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getEarthquakeRiskByAddress=function(b,c){var a="/georisk/v1/earthquake/byaddress?address="+encodeURIComponent(b.address);optionalList=["richterValue","includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedEarthquakeRiskByAddress=function(b,c){var a="/georisk/v1/earthquake/byaddress";postData='{"preferences":'+b.preferences+', "addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getEarthquakeRiskByLocation=function(b,c){var a="/georisk/v1/earthquake/bylocation?longitude="+encodeURIComponent(b.longitude)+"&latitude="+encodeURIComponent(b.latitude);optionalList=["richterValue","includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedEarthquakeRiskByLocation=function(b,c){var a="/georisk/v1/earthquake/bylocation";postData='{"preferences":'+b.preferences+', "locations":'+b.locations+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getEarthquakeHistory=function(b,c){var a="/georisk/v1/earthquakehistory?postCode="+encodeURIComponent(b.postCode);optionalList=["startDate","endDate","minMagnitude","maxMagnitude","maxCandidates"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFloodRiskByAddress=function(b,c){var a="/georisk/v1/flood/byaddress?address="+encodeURIComponent(b.address);optionalList=["includeZoneDesc","includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedFloodRiskByAddress=function(b,c){var a="/georisk/v1/flood/byaddress";postData='{"preferences":'+b.preferences+', "addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFloodRiskByLocation=function(b,c){var a="/georisk/v1/flood/bylocation?longitude="+encodeURIComponent(b.longitude)+"&latitude="+encodeURIComponent(b.latitude);optionalList=["includeZoneDesc","includeGeometry"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedFloodRiskByLocation=function(b,c){var a="/georisk/v1/flood/bylocation";postData='{"preferences":'+b.preferences+', "locations":'+b.locations+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFireRiskByAddress=function(b,c){var a="/georisk/v1/fire/byaddress?address="+encodeURIComponent(b.address);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedFireRiskByAddress=function(b,c){var a="/georisk/v1/fire/byaddress";postData='{"addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFireRiskByLocation=function(b,c){var a="/georisk/v1/fire/bylocation?longitude="+encodeURIComponent(b.longitude)+"&latitude="+encodeURIComponent(b.latitude);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedFireRiskByLocation=function(b,c){var a="/georisk/v1/fire/bylocation";postData='{"locations":'+b.locations+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFireHistory=function(b,c){var a="/georisk/v1/firehistory?postCode="+encodeURIComponent(b.postCode);optionalList=["startDate","endDate","minMagnitude","maxMagnitude","maxCandidates"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFireStationByAddress=function(b,c){var a="/georisk/v1/firestation/byaddress?address="+encodeURIComponent(b.address);optionalList=["maxCandidates","travelTime","travelTimeUnit","travelDistance","travelDistanceUnit","sortBy","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getFireStationByLocation=function(b,c){var a="/georisk/v1/firestation/bylocation?longitude="+encodeURIComponent(b.longitude)+"&latitude="+encodeURIComponent(b.latitude);optionalList=["maxCandidates","travelTime","travelTimeUnit","travelDistance","travelDistanceUnit","sortBy","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getDistanceToFloodHazardByAddress=function(b,c){var a="/georisk/v1/shoreline/distancetofloodhazard/byaddress?address="+encodeURIComponent(b.address);optionalList=["maxCandidates","waterBodyType","searchDistance","searchDistanceUnit"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getDistanceToFloodHazardByLocation=function(b,c){var a="/georisk/v1/shoreline/distancetofloodhazard/bylocation?longitude="+encodeURIComponent(b.longitude)+"&latitude="+encodeURIComponent(b.latitude);optionalList=["maxCandidates","waterBodyType","searchDistance","searchDistanceUnit"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvanceDistanceToFloodHazardByLocation=function(b,c){var a="/georisk/v1/shoreline/distancetofloodhazard/bylocation";postData='{"preferences":'+b.preferences+', "locations":'+b.locations+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRisk.prototype.getAdvancedDistanceToFloodHazardkByAddress=function(b,c){var a="/georisk/v1/shoreline/distancetofloodhazard/byaddress";postData='{"preferences":'+b.preferences+',"addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoRoute=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoRoute);GEOAPIS_V1.geoRoute.prototype.getRouteByAddress=function(b,c){var a="/georoute/v1/route/byaddress?startAddress="+encodeURIComponent(b.startAddress)+"&endAddress="+encodeURIComponent(b.endAddress);optionalList=["db","country","intermediateAddresses","oip","destinationSrs","optimizeBy","returnDistance","distanceUnit","returnTime","timeUnit","language","directionsStyle","segmentGeometryStyle","primaryNameOnly","majorRoads","returnDirectionGeometry","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRoute.prototype.getRouteByLocation=function(b,c){var a="/georoute/v1/route/bylocation?startPoint="+encodeURIComponent(b.startPoint)+"&endPoint="+encodeURIComponent(b.endPoint);optionalList=["db","intermediatePoints","oip","destinationSrs","optimizeBy","returnDistance","distanceUnit","returnTime","timeUnit","language","directionsStyle","segmentGeometryStyle","primaryNameOnly","majorRoads","returnDirectionGeometry","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRoute.prototype.getTravelCostMatrixByAddress=function(b,c){var a="/georoute/v1/travelcostmatrix/byaddress?startAddresses="+encodeURIComponent(b.startAddresses)+"&endAddresses="+encodeURIComponent(b.endAddresses);optionalList=["db","country","optimizeBy","returnDistance","destinationSrs","distanceUnit","returnTime","timeUnit","majorRoads","returnOptimalRoutesOnly","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoRoute.prototype.getTravelCostMatrixByLocation=function(b,c){var a="/georoute/v1/travelcostmatrix/bylocation?startPoints="+encodeURIComponent(b.startPoints)+"&endPoints="+encodeURIComponent(b.endPoints);optionalList=["db","optimizeBy","returnDistance","destinationSrs","distanceUnit","returnTime","timeUnit","majorRoads","returnOptimalRoutesOnly","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoSearch=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoSearch);GEOAPIS_V1.geoSearch.prototype.getLocation=function(c,d){var b="/geosearch/v1/locations?searchText="+encodeURIComponent(c.searchText),a=["latitude","longitude","country","areaName1","areaName3","postCode","maxCandidates","searchRadius","searchRadiusUnit","matchOnAddressNumber","autoDetectLocation","ipAddress"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoSearch=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoSearch);GEOAPIS_V1.geoSearch.prototype.getLocation=function(c,d){var b="/geosearch/v2/locations?searchText="+encodeURIComponent(c.searchText),a=["latitude","longitude","country","areaName1","areaName3","postCode","maxCandidates","searchRadius","searchRadiusUnit","matchOnAddressNumber","autoDetectLocation","ipAddress","returnAdminAreasOnly","includeRangesDetails"];b=this.apiGetUrl(c,a,b);if(d!==undefined){this.callApiAsync(b,d)}else{this.callApi(b);return this.response}};GEOAPIS_V1.geoTax=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoTax);GEOAPIS_V1.geoTax.prototype.getTaxRateByAddress=function(b,c){var a="/geotax/v1/taxrate/"+encodeURIComponent(b.taxType)+"/byaddress?address="+encodeURIComponent(b.address);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoTax.prototype.getTaxRateByLocation=function(b,c){var a="/geotax/v1/taxrate/"+encodeURIComponent(b.taxType)+"/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoTax.prototype.getTaxByAddress=function(b,c){var a="/geotax/v1/tax/"+encodeURIComponent(b.taxType)+"/byaddress?address="+encodeURIComponent(b.address)+"&purchaseAmount="+encodeURIComponent(b.purchaseAmount);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoTax.prototype.getTaxByLocation=function(b,c){var a="/geotax/v1/tax/"+encodeURIComponent(b.taxType)+"/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude)+"&purchaseAmount="+encodeURIComponent(b.purchaseAmount);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoTax.prototype.getIpdTaxRateByAddress=function(b,c){var a="/geotax/v1/taxdistrict/ipd/byaddress?address="+encodeURIComponent(b.address);optionalList=["returnLatLongFields","latLongFormat"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoTax.prototype.getAdvancedTaxRateByAddress=function(b,c){var a="/geotax/v1/taxrate/"+encodeURIComponent(b.taxType)+"/byaddress";postData='{"preferences":'+b.preferences+', "taxRateAddresses":'+b.taxRateAddresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoTax.prototype.getAdvancedTaxRateByLocation=function(c,d){var b="/geotax/v1/taxrate/"+encodeURIComponent(c.taxType)+"/bylocation",a='{"preferences":'+c.preferences+', "locations":'+c.locations+"}";if(d!==undefined){this.callPostApiAsync(b,a,d)}else{this.callPostApi(b,a);return this.response}};GEOAPIS_V1.geoTax.prototype.getAdvancedTaxByAddress=function(c,d){var b="/geotax/v1/tax/"+encodeURIComponent(c.taxType)+"/byaddress",a='{"preferences":'+c.preferences+', "taxAddresses":'+c.taxAddresses+"}";if(d!==undefined){this.callPostApiAsync(b,a,d)}else{this.callPostApi(b,a);return this.response}};GEOAPIS_V1.geoTax.prototype.getAdvancedTaxByLocation=function(c,d){var b="/geotax/v1/tax/"+encodeURIComponent(c.taxType)+"/bylocation",a='{"preferences":'+c.preferences+', "locations":'+c.locations+"}";if(d!==undefined){this.callPostApiAsync(b,a,d)}else{this.callPostApi(b,a);return this.response}};GEOAPIS_V1.geoTax.prototype.getAdvancedIpdTaxRateByAddress=function(b,c){var a="/geotax/v1/taxdistrict/ipd/byaddress";postData='{"preferences":'+b.preferences+', "addresses":'+b.addresses+"}";if(c!==undefined){this.callPostApiAsync(a,postData,c)}else{this.callPostApi(a,postData);return this.response}};GEOAPIS_V1.geoTime=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoTime);GEOAPIS_V1.geoTime.prototype.getTimezoneByAddress=function(b,c){var a="/geotime/v1/timezone/byaddress?address="+encodeURIComponent(b.address)+"&timestamp="+encodeURIComponent(b.timestamp);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoTime.prototype.getTimezoneByLocation=function(b,c){var a="/geotime/v1/timezone/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude)+"&timestamp="+encodeURIComponent(b.timestamp);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoZone=function(a){GEOAPIS_V1.baseService.call(this,a)};GEOAPIS_V1_INHERIT(GEOAPIS_V1.baseService,GEOAPIS_V1.geoZone);GEOAPIS_V1.geoZone.prototype.getTravelBoundaryByTime=function(b,c){var a="/geozone/v1/travelboundary/bytime?costs="+encodeURIComponent(b.costs);optionalList=["costUnit","point","address","country","db","defaultAmbientSpeed","ambientSpeedUnit","maxOffroadDistance","maxOffroadDistanceUnit","destinationSrs","majorRoads","returnHoles","returnIslands","simplificationFactor","bandingStyle","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoZone.prototype.getTravelBoundaryByDistance=function(b,c){var a="/geozone/v1/travelboundary/bydistance?costs="+encodeURIComponent(b.costs);optionalList=["costUnit","point","address","country","db","defaultAmbientSpeed","ambientSpeedUnit","maxOffroadDistance","maxOffroadDistanceUnit","destinationSrs","majorRoads","returnHoles","returnIslands","simplificationFactor","bandingStyle","historicTrafficTimeBucket"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoZone.prototype.getBasicBoundaryByAddress=function(b,c){var a="/geozone/v1/basicboundary/byaddress?address="+encodeURIComponent(b.address)+"&distance="+encodeURIComponent(b.distance);optionalList=["country","distanceUnit","resolution","responseSrs"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};GEOAPIS_V1.geoZone.prototype.getBasicBoundaryByLocation=function(b,c){var a="/geozone/v1/basicboundary/bylocation?latitude="+encodeURIComponent(b.latitude)+"&longitude="+encodeURIComponent(b.longitude)+"&distance="+encodeURIComponent(b.distance);optionalList=["srsName","distanceUnit","resolution","responseSrs"];a=this.apiGetUrl(b,optionalList,a);if(c!==undefined){this.callApiAsync(a,c)}else{this.callApi(a);return this.response}};