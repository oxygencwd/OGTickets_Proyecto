angular.module('OGTicketsApp.services')
.service('dateService', [function() {


	var setDoubleDigit= function(value) {
		if(value<10){
			return ("0" + value);
		}else{
			return value;
		}
	};


	var setDateTimeFormat= function(_date) {
		var date= new Date(_date);
		var day= setDoubleDigit(date.getDate());
		var month= date.getMonth();
		var year= date.getFullYear();

		month++;
		month= setDoubleDigit(month);

		finalDate= year + '-' + month + '-' + day;

		var hours= setDoubleDigit(date.getHours());
		var min= setDoubleDigit(date.getMinutes());
		var sec= setDoubleDigit(date.getSeconds());

		finalTime= hours + ':' + min + ':' + sec;

		var dateTime= finalDate + ' ' + finalTime;

		return dateTime;

	};




//puntos de acceso de los metodos del servicio:
	return{
		setDateTimeFormat:setDateTimeFormat
	};
}]);//end -service-




