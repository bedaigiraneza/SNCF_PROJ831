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
		.text("Travellers in 2019:")
		.attr("y", +d3.select("#nom").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start")

	// emplacement du text 'variation par rapport à 2018'
	statG.append("text")
		.attr("id","Variation")
		.text("Fluctuation 2018/2019:")
		.attr("y", +d3.select("#Nombredevoyageurs").attr("y")+30)
		.attr("x", 0)
		.attr("text-anchor","start")

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

	if (gare1 != null) {
		statG.append("text")
			.attr("id","valeur_voyageurs")
			.attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
			.attr("x", +d3.select("#Nombredevoyageurs").attr("x")+170)
			.attr("text-anchor","start")

		statG.append("text")
			.attr("id","valeur_variation")
			.attr("y", +d3.select("#Variation").attr("y"))
			.attr("x", +d3.select("#Variation").attr("x")+170)
			.style("text-anchor","start")
};

    // emplacement du rang pour la gare 1
    statG.append("text")
        .attr("id","valeur_rang")
        .attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
        .attr("x", function(){return +d3.select("#valeur_voyageurs").attr("x")+50})
        .style("text-anchor","start")

    // emplacement du rang de variation pour la gare 1
    statG.append("text")
        .attr("id","valeur_rangvar")
        .attr("y", +d3.select("#Variation").attr("y"))
        .attr("x", function(){return +d3.select("#valeur_variation").attr("x")+50})
        .style("text-anchor","start")

    // emplacement du nom de la gare 1
    statG.append("text")
        .attr("id","nom1")
        .attr("y", +d3.select("#nom").attr("y"))
        .attr("x", +d3.select("#nom").attr("x")+170)
        .attr("text-anchor","start")
        .style("font-weight","bold")
};

if (gare2 != null) {
    // emplacement du nom de la gare 2
    statG.append("text")
        .attr("id","nom2")
        .attr("y", +d3.select("#nom").attr("y"))
        .attr("x", +d3.select("#nom").attr("x")+460)
        .attr("text-anchor","start")
        .style("font-weight","bold")

    statG.append("text")
        .attr("id","valeur_voyageurs2")
        .attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
        .attr("x", +d3.select("#Nombredevoyageurs").attr("x")+460)
        .attr("text-anchor","start")

	statG.append("text")
		.attr("id","valeur_variation2")
		.attr("y", +d3.select("#Variation").attr("y"))
		.attr("x", +d3.select("#Variation").attr("x")+460)
		.style("text-anchor","start")

	// emplacement du rang pour la gare 2
	statG.append("text")
		.attr("id","valeur_rang2")
		.attr("y", +d3.select("#Nombredevoyageurs").attr("y"))
		.attr("x",function(){return +d3.select("#valeur_voyageurs2").attr("x")+50})
		.style("text-anchor","start")

	// emplacement du rang de variation pour la gare 2
	statG.append("text")
		.attr("id","valeur_rangvar2")
		.attr("y", +d3.select("#Variation").attr("y"))
		.attr("x",function(){return +d3.select("#valeur_variation2").attr("x")+50})
		.style("text-anchor","start")
};
data.forEach(function(d){
	if(d.Code_UIC == gare1){
		var mon_text1 = ""
		if(d.Variations>0){mon_text1 = "+"}

		d3.select("#valeur_rang")
			.text("(#"+ d.RangNbVoy +")")
			.attr("fill",couleur1);

		d3.select("#valeur_rangvar")
			.text("(#"+ d.RangVariations +")")
			.attr("fill",couleur1);

		d3.select("#valeur_voyageurs")
			.text(d3.format(".3s")(d.voyageurs_2016))
			.attr("fill",couleur1);

		d3.select("#valeur_variation")

			.text(mon_text1+d3.format(".1%")(d.Variations))
			.attr("fill",couleur1);

		d3.select("#nom1")
			.text(d.Nom_de_la_gare)
			.attr("fill",couleur1);

	};

	if(d.Code_UIC == gare2){
		var mon_text2 = ""
		if(d.Variations>0){mon_text2 = "+"}

		d3.select("#valeur_rang2")
			.text("(#"+(d.RangNbVoy)+")")
			.attr("fill",couleur2)

		d3.select("#valeur_rangvar2")
			.text("(#"+(d.RangVariations)+")")
			.attr("fill",couleur2)

		d3.select("#valeur_voyageurs2")
			.text(d3.format(".3s")(d.voyageurs_2016))
			.attr("fill",couleur2)

		d3.select("#valeur_variation2")

			.text(mon_text2+d3.format(".1%")(d.Variations))
			.attr("fill",couleur2)

		d3.select("#nom2")
			.text(d.Nom_de_la_gare)
			.attr("fill",couleur2)

		;}
	;})
;}

function refreshWifi(div1,div2,i){
	creationRects(x_divertissements1+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_wifi",function(){if(div1[i][1]=='true'){return couleur1}else{return couleur3}})

	creationRects(x_divertissements2+(i*h_rect)+(i*w_rect),y_divertissements,"valeur_wifi2",function(){if(div2[i][1]=='true'){return couleur2}else{return couleur3}})

	var svg_wifi = statG.append("svg")

	svg_wifi
		.attr("preserveAspectRatio","xMidYMid meet")
		.attr("viewBox","0 0 550 550")
		.attr("width",h_rect)
		.attr("height",h_rect)

	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M0,146.93c2.44-6.87,7.4-11.36,13.32-15.39C68,94.27,127.92,70,193.55,60.83c112-15.68,214.64,8.85,308,72.69A29,29,0,0,1,512,146.93v9c-3.81,9-9.67,15.3-20.35,15.28-4.91,0-9-2-12.87-4.72-41-28.73-85.82-49.46-134.72-60.22Q177,69.54,34.84,165.37c-4.16,2.81-8.22,5.57-13.52,5.8C10.17,171.67,4,165.34,0,155.93v-9Z")

	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M422.62,249.08c-4.29.19-8.32-1.53-12.11-4.18-36.07-25.25-75.92-41.14-119.59-46.63q-93.66-11.77-174.76,37.07c-5.13,3.09-10,6.52-15,9.8-10.2,6.68-22.21,4.66-28.6-4.82s-4-21.09,5.88-28C117.56,184.87,160.66,167,208,159.86c79.81-12,153.39,4.53,220.69,49.05a74.62,74.62,0,0,1,7.3,5.23,19.67,19.67,0,0,1,5.62,22.23C438.69,244.07,431.42,249,422.62,249.08Z")

	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M353.72,327a19.38,19.38,0,0,1-11.64-3.81c-29.65-20.36-62.49-28.94-98.27-26.26a145.19,145.19,0,0,0-72.55,25.41c-6.16,4.23-12.59,6.1-19.76,3.52-7.75-2.79-12.28-8.56-13.24-16.64s2.33-14.31,8.86-18.88a178.83,178.83,0,0,1,65.23-28.79c54.58-11.77,105.41-2.86,152,28.45,8.2,5.51,11.31,14.2,8.6,23A20,20,0,0,1,353.72,327Z")

	svg_wifi.append("path")
		.attr("id","path_wifi")
		.attr("d","M256.44,355.87A49.92,49.92,0,0,1,306,406.06c-0.08,27.33-22.74,49.8-50.13,49.7a50.15,50.15,0,0,1-49.77-50.55C206.23,377.84,228.79,355.75,256.44,355.87Z")

	svg_wifi.attr("x",d3.select("#valeur_wifi").attr("x"))
	svg_wifi.attr("y",d3.select("#valeur_wifi").attr("y"))
}
