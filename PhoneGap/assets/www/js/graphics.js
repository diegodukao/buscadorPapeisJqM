    function geraGrafico(data, nome) {
        var chart1 = new Highcharts.StockChart({
            chart: {
                renderTo: 'divGraficoCotacoes'                
            },
            rangeSelector: {
                selected : 2
            },
            title: {
                text: 'Hist��rico de ' + nome
            },            
            series: [{
                type: 'candlestick',
                name: nome,
                data: data
            }]
        });
    }


    jQuery.support.cors = true;



    //evento de busca de pap��is
    $("#btnBuscaEmpresa").on("click" , function(event) {
        event.preventDefault();
        var campos = ['#tbPlMin', '#tbPlMax', '#tbRoeMin', '#tbRoeMax', '#tbDivPatrMin', '#tbDivPatrMax'];
        for (var i = 0; i < campos.length; i++) {                    
            if( $.trim($(campos[i]).val()).length > 0 && 
                ( $(campos[i]).val().indexOf(".") !== -1  ||
                    isNaN(parseFloatStringInBrLocale( $(campos[i]).val() )) )  ) {
                alert("Um dos par��mertos est�� em formato incorreto.");                        
            return false;
        }
    }

    var plMin = getFloatStringParameter($('#tbPlMin').val());
    var plMax = getFloatStringParameter($('#tbPlMax').val());
    var roeMin = getFloatStringParameter($('#tbRoeMin').val());
    var roeMax = getFloatStringParameter($('#tbRoeMax').val());
    var divBrutaMin = getFloatStringParameter($('#tbDivPatrMin').val());
    var divBrutaMax = getFloatStringParameter($('#tbDivPatrMax').val());

    if( $.trim(plMin).length>0 &&  $.trim(plMax).length>0 && parseFloat(plMin) > parseFloat(plMax) ) {
        alert("O P/L m��nimo deve ser menor ou igual ao P/L m��ximo");
            // importante retornar false para o bot��o n��o permanecer com o estilo "clicado"                
            return false;
        }
        if( $.trim(roeMin).length>0 &&  $.trim(roeMax).length>0 && parseFloat(roeMin) > parseFloat(roeMax) ) {
            alert("O ROE m��nimo deve ser menor ou igual ao ROE m��ximo");                
            $('.ui-btn-active').removeClass('ui-btn-active');
            return false;
        }
        if( $.trim(divBrutaMin).length>0 &&  $.trim(divBrutaMax).length>0 && parseFloat(divBrutaMin) > parseFloat(divBrutaMax) ) {
            alert("A d��vida bruta sobre patrim��nio m��nima deve ser menor ou igual ao m��ximo");                
            $('.ui-btn-active').removeClass('ui-btn-active');
            return false;
        }


    // pegar entradas            
    var serviceUrl = 'http://buscadorpapeis-prospeccaohtml5.rhcloud.com/buscadorpapeis/rest/papeis/buscar?plMin='+
    plMin+"&"+
    "plMax="+plMax+"&"+
    "roeMin="+roeMin+"&"+
    "roeMax="+roeMax+"&"+
    "divBrutaMin="+divBrutaMin+"&"+
    "divBrutaMax="+divBrutaMax;
        // construir urls
        $.ajax( {
            type: 'Get',                                       
            url: serviceUrl,
            dataType: 'jsonp',                    
            success: function(data) {
                        //alert("resultado da busca: "+data);
                        carregarResultadoBusca(data);
                        //$.mobile.navigate("#resultadoBusca");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("cors: "+jQuery.support.cors+"Erro na requisicao: "+textStatus+" - "+errorThrown);
                    }                 
                })  
        ;
        $("#tblResultadoBusca tbody").html('');
        $.mobile.navigate("#resultadoBusca");
        $("#tblResultadoBusca tbody").html( '<tr><td colspan=6> Carregando ...<img src="css\\images\\ajax-loader-bar.gif"> </img> </td></tr>'  );

        });

        //tratamento da resposta da busca na p��gina de resultados
        function carregarResultadoBusca(data) {
        // como foi utilizado jsonp, o resultado retornado j�� �� um objeto javascript, e n��o uma string
        var result = data;
        var r = new Array(), j = -1;
        for (var i = 0; i < result.length; i++) {
            var nome = result[i].nome;
            var cotacaoAtual = parseFloatStringInBrLocale(result[i].cotacaoAtual);
            var dividaBrutaSobrePatrimonio = parseFloatStringInBrLocale(result[i].dividaBrutaSobrePatrimonio);
            var patrimonioLiquido = parseFloatStringInBrLocale(result[i].patrimonioLiquido);
            var pL = parseFloatStringInBrLocale(result[i].precoSobreLucro);
            var roe = parseFloatStringInBrLocale(result[i].retornoSobrePatrimonio);
            //console.log(nome+" - "+cotacaoAtual+" - "+dividaBrutaSobrePatrimonio+" - "+patrimonioLiquido+" - "
            //    +pL+" - "+roe);
            // montagem da linha da tabela
            r[++j]='<tr><td> <b>';
                r[++j]='<a href="#" onClick="showGraficoCotacoes(\'' + result[i].nome + '\')" data-transition="slide">';
            r[++j] = nome;
            r[++j] = '</a></b></td><td class="ui-table-priority-1">';
            r[++j] = cotacaoAtual;
            r[++j] = '</td><td class="ui-table-priority-1">';
            r[++j] = dividaBrutaSobrePatrimonio;
            r[++j] = '</td><td class="ui-table-priority-3">';
            r[++j] = patrimonioLiquido;
            r[++j] = '</td><td class="ui-table-priority-1">';
            r[++j] = pL;
            r[++j] = '</td><td class="ui-table-priority-1">';
            r[++j] = roe;
            r[++j] = '</td></tr>';
        }                
        $("#tblResultadoBusca tbody").html(r.join(''));
        $("#tblResultadoBusca tr:odd").css("background-color", "#FDFDFD");
        $("#tblResultadoBusca tr:even").css("background-color", "#EFEFEF");
       
    }

  function showGraficoCotacoes(nome){
            location.href = "#graficoCotacoes";
            $.ajax( {
                type: 'Get',                                       
                url: 'http://buscadorgraficos-prospeccaohtml5.rhcloud.com/buscadorgraficos/rest/papeis/buscar?nomePapel=' + nome + '&dataInicial=01/01/2010&dataFinal=20/03/2013',
                dataType: 'jsonp',                    
                success: function(data) {
                            //alert("resultado da busca: "+data);
                            geraGrafico(data, nome);
                            //$.mobile.navigate("#resultadoBusca");
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert("cors: "+jQuery.support.cors+"Erro na requisicao: "+textStatus+" - "+errorThrown);
                        }                 
                    })  
            ;
        }

    function parseFloatStringInBrLocale(arg) {
        return parseFloat(arg.replace(".","").replace(",","."));
    }

    function getFloatStringParameter(arg) {
        var res = parseFloat(arg.replace(".","").replace(",","."));
        if(isNaN(res)) {
            return "";
        }
        return String(res);
    }
