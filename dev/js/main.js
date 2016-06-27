var SubArt = {
	init: function() {
		"use strict";

		SubArt.background();
		SubArt.navegacao();
		SubArt.lightbox();
		SubArt.instagram();
	},
	background: function() {
		"use strict";

		$("body").vegas({
			overlay: true,
			preload: true,
			transition: "fade", 
			transitionDuration: 1000,
			color: "black",
			animation: "fade",
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

        $(".instaImages").load(function() {
	        $(".jumbotron").css("top", Math.max(0, (($(".pagina-inicial").height() - $(".jumbotron").outerHeight()) / 2) + $(".pagina-inicial").scrollTop()) + "px");
	        $(".jumbotron").css("left", Math.max(0, (($(".pagina-inicial").width() - $(".jumbotron").outerWidth()) / 2) + $(".pagina-inicial").scrollLeft()) + "px");

	        return this;
        });
    },
    navegacao: function() {
    	"use strict";

    	$("#navbar a[href^='#']").on("click", function(e) {
			e.preventDefault();
			
			$("#navbar").find("li").removeClass("active");
			$(this).parent().addClass("active");

			var hash = this.hash;

			$("html, body").animate({
				scrollTop: $(hash).offset().top - 50
			}, 300);
		});
    },
    lightbox: function() {
    	"use strict";

    	lightbox.option({
		"resizeDuration": 200,
		"wrapAround": false,
		"albumLabel": "Imagem %1 de %2",
		"wrapAround": true
		});
    },
    instagram: function() {
    	"use strict";

    	var accessToken = "2072847442.3a81a9f.ba226decbb1e4fe48e66c65a1ea69fcf",
    		userId = "2072847442";

    	$(".instagram-feed").on("willLoadInstagram", function(event, options) {
    		// aqui vai o loader
		});
		$(".instagram-feed").on("didLoadInstagram", function(event, response) {
			var urlThumbImg1 = response.data[0].images.thumbnail.url,
				urlImg1 = response.data[0].link,
				urlThumbImg2 = response.data[1].images.thumbnail.url,
				urlImg2 = response.data[1].link,
				urlThumbImg3 = response.data[2].images.thumbnail.url,
				urlImg3 = response.data[2].link;

			console.log(response);

			$(".thumbImg1").attr("src", urlThumbImg1).parent("a").attr("href", urlImg1);
			$(".thumbImg2").attr("src", urlThumbImg2).parent("a").attr("href", urlImg2);
			$(".thumbImg3").attr("src", urlThumbImg3).parent("a").attr("href", urlImg3);

			SubArt.centralizaPaginaInicial();
		});
		$(".instagram-feed").instagram({
			userId: userId,
			accessToken: accessToken,
			count: 3
		});
    }
}
 
$(function() {
	"use strict";

	SubArt.init();
});