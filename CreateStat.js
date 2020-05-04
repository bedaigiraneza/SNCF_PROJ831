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
// Définition des fonctions
function pushInfo(d,divertissements,acces,motif){
	divertissements.push({
		wifi: d.Wifi,
		baby_foot: d.Baby_Foot,
		powerstation: d.Power_Station,
		piano: d.Piano,
		histoires: d.Distr_Histoires_Courtes
	});

	acces.push({
		voiture: +d.deux_roues_motorisees + +d.Autres_voitures_location_autopartage + +d.Voiture_Conducteur + +d.Voiture_passager,
		taxis: +d.Taxis,
		bus: +d.Bus_Car_Navette,
		metro: +d.Metro_RER,
		tram: +d.Tramway,
		marche: +d.Marche,
		velo: +d.Velo
	});

	motif.push({
		divers: +d.Demarches_administratives_medicales_ou_achat,
		commute: +d.Deplacement_domicile_travail_habituel,
		etudes: +d.Deplacement_domicile_etude_y_compris_stage,
		occasionnel: +d.Deplacement_professionnel_occasionnel,
		loisirs: +d.Loisirs_vacances_visite_d_un_proche_ou_ami
	});
};

function refreshText(data,gare1,gare2){
    //titre
    statG.append("text")
        .attr("class","titre")
        .attr("id","caracteristiques")
        .attr("y", 0)
        .attr("x", 0)
        .text("Features");

    // emplacement du texte 'nom des gares'
    statG.append("text")
        .attr("id","nom")
        .text("Name:")
        .attr("y", +d3.select("#caracteristiques").attr("y")+30)
        .attr("x", 0)
        .attr("text-anchor","start");
// emplacement du text 'nombre de voyageurs'
	statG.append("text")
		.attr("id","Nombredevoyageurs")
		.text("Travellers in 2016:")
		.attr("y", +d3.select("#nom").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start")

	// emplacement du text 'variation par rapport à 2015'
	statG.append("text")
		.attr("id","Variation")
		.text("Fluctuation 2016/2015:")
		.attr("y", +d3.select("#Nombredevoyageurs").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start")
};
// emplacement du text 'Divertissement'
statG.append("text")
    .attr("id","Divertissements")
    .text("Entertainment:")
    .attr("y", y_divertissements+18)
    .attr("x", 0)
    .attr("text-anchor","start")

// emplacement du text "Moyens d'acces"
statG.append("text")
    .text("How to get there?")
    .attr("y", y_acces+18)
    .attr("x", 0)
    .attr("text-anchor","start");

