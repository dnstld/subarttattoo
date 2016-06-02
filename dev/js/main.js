var SubArt = {
	init: function() {
		"use strict";

		SubArt.background();
		SubArt.centralizaPaginaInicial();
	},
	background: function() {
		"use strict";

		$("body").vegas({
			overlay: true,
			preload: true,
			transition: "fade", 
			transitionDuration: 1000,
			color: "black",
			animation: "random",
			animationDuration: 2000,
			delay: 3000,
			slides: [
				{src: "assets/images/estudio/entrada.jpg"},
				{src: "assets/images/estudio/recepcao.jpg"},
				{src: "assets/images/estudio/recepcao-02.jpg"},
				{src: "assets/images/estudio/sala-de-espera.jpg"},
				{src: "assets/images/estudio/area-de-trabalho.jpg"},
				{src: "assets/images/estudio/area-de-trabalho-02.jpg"},
				{src: "assets/images/estudio/area-de-trabalho-03.jpg"},
				{src: "assets/images/estudio/area-de-trabalho-04.jpg"},
				{src: "assets/images/estudio/area-de-trabalho-06.jpg"},
				{src: "assets/images/estudio/area-de-trabalho-07.jpg"}
			]
		});
	},
	centralizaPaginaInicial: function() {
        "use strict";

        $(".jumbotron").css("top", Math.max(0, (($(".pagina-inicial").height() - $(".jumbotron").outerHeight()) / 2) + $(".pagina-inicial").scrollTop()) + "px");
        $(".jumbotron").css("left", Math.max(0, (($(".pagina-inicial").width() - $(".jumbotron").outerWidth()) / 2) + $(".pagina-inicial").scrollLeft()) + "px");

        return this;
    },
}

$(function() {
	"use strict";

	SubArt.init();
});