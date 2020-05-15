function CreateGlyph(data, gare1 ,gare2) {
	if (gare1 || gare2) {
		function dataPoint(d,stationSelected){
			return [{
						uic : gare1,
						name : d.Nom_de_la_gare,
						score : (+d.Proprete + +d.Securite + +d.Communication_perturbations + +d.Confort_d_attente + +d.Commerces_restauration + 10 - +d.MoyenneDistance * 10 / 16.8 + +d.score_pmr13*10/13 ) / 7,
						axes : [
							{indice : 'Proprete', value : +d.Proprete },
							{indice : 'Securite', value : +d.Securite },
							{indice : 'Communication_perturbations', value : +d.Communication_perturbations },
							{indice : 'Confort_d_attente', value : +d.Confort_d_attente },
							{indice : 'Commerces_restauration', value : +d.Commerces_restauration },
							{indice : 'MoyenneDistance', value : 10 - +d.MoyenneDistance * 10 / 16.8 },
							{indice : 'score_pmr13', value : +d.score_pmr13*10/13}
						]
					}];
		};
		
		function radarChartOptions(colors){
			return {
				w: 180,
				h: 240,
				margin: margin,
				maxValue: 10,
				levels: 10,
				roundStrokes: false,
				color: d3.scaleOrdinal().range(colors),
				format: '.1f',
				legend: {title: "Satisfaction :", translateX: -100, translateY: 35},
			};
		};
		
		var margin = { top: 50, right: 80, bottom: 50, left: 80 },
			width = 340,
			height = width,
			dataset = [{}],
			data1 = [{}],
			data2 = [{}];
	}
};
