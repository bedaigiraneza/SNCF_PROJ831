function CreateStat(data, gare1, gare2) {
	statG.selectAll("*").remove();
	
	if (gare1 == null && gare2 == null) {
		d3.select("#start").attr("style","display: block; height: 100%; width: 100%;");
		d3.select("#stat").attr("style","display: none");
		d3.select("#radarChart").attr("style","display: none");
	}
	
	else {
		divertissements1 = [{uic: gare1}], //json avec les divertissements en gare1
		divertissements2 = [{uic: gare2}], //json avec les divertissements en gare2
		acces1 = [{uic: gare1}], //json avec les moyens d'acces en gare1
		acces2 = [{uic: gare2}], //json avec les moyens d'acces en gare2
		motif1 = [{uic: gare1}], //json avec les motif d'arrivé en gare1
		motif2 = [{uic: gare2}]; //json avec les motif d'arrivé en gare2
	  
		//parcours des données
		data.forEach(function(d){
			if(d.Code_UIC == gare1){pushInfo(d,divertissements1,acces1,motif1); };  
			if(d.Code_UIC == gare2){pushInfo(d,divertissements2,acces2,motif2); };
		}); // fin forEach

		if (gare1 == null && gare2 != null){
			divertissements1 = divertissements2
			acces1 = acces2
			motif1 = motif2;
		}
		else if(gare1 != null && gare2 == null){
			divertissements2 = divertissements1
			acces2 = acces1
			motif2 = motif1;
		};
		
		refreshText(data,gare1,gare2)
		refreshDiv(divertissements1,divertissements2,gare1,gare2)
		refreshAcces(acces1,acces2,gare1,gare2)
		d3.selectAll("rect")
			.attr("width",w_rect)
			.attr("height",h_rect)
		refreshMotif(motif1,motif2,gare1,gare2);
		if(gare1==null){d3.selectAll("rect").style("fill",couleur2);}
		else if(gare2==null){d3.selectAll("rect").style("fill",couleur1);}  ;       
	};
};
