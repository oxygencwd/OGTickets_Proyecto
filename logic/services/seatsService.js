angular.module('OGTicketsApp.services')
.service('seatsService', ['siteService', 'eventService', 'localStorageService', function(siteService, eventService, localStorageService) {

	var reservedSeatxEventxSite= localStorageService.getAll("reservedSeatxEventxSite");

	var rowsIds= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	var getRows= function (rows) {
		var i=0,
			rowsArray=[];

		while(i<rows){
			rowsArray.push(rowsIds[i]);
			i++;
		};
		return rowsArray;
	};

	var getCols= function (cols) {
		var i=0,
			colsArray=[];

		while(i<cols){
			colsArray.push(i+1);
			i++;
		};
		return colsArray;	
	};

	var getReserved= function (zoneId, siteId, eventId) {
		result = reservedSeatxEventxSite.filter(function (item) {
		return item.eventId == eventId && item.siteId == siteId && item.Zoneid== zoneId;
		});
		var idsList= getReservedIds(result);
		return idsList;
    };

    var getReservedIds= function (array) {
    	var i=0,
			idsArray=[];

		while(i<array.length){
			idsArray.push(array[i].seatId);
			i++;
		};
		return idsArray;
    };



//puntos de acceso de los metodos del servicio:
	return{
		getRows:getRows,
		getCols:getCols,
		getReserved:getReserved
	};
}]);//end -service-


