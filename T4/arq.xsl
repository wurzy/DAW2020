<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" encoding="iso-8859-1" indent="yes"/>
    <xsl:template match="/">
        <xsl:result-document href="site/index.html"> 
            <html>
                <head>
                    <title>Arqueossítios do NW Português</title>
                </head>
                <body>
                    <h2 class="w3-bar" style="color:#2196F3; text-align:center;">Arqueossítios do NW Português </h2>
                    <h3> &#8594; Índice de Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice">  <!-- Gerar o índice -->
                            <xsl:sort select="normalize-space(IDENTI)"
                                lang="iso-8859-1"/> <!-- Alguns titulos vinham com espaço branco e estragavam o sort
                                                         e era preciso ordenar direito por causa dos acentos portugueses -->
                        </xsl:apply-templates>
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM"> 
            <xsl:sort select="normalize-space(IDENTI)"
                lang="iso-8859-1"/> <!-- era preciso ordenar da mesma forma que os indices para bater certo -->
        </xsl:apply-templates> 
    </xsl:template>
    
    <!-- Templates de índice ............................................ -->
    
    <xsl:template match="ARQELEM" mode="indice"> 
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:7777/arqs/{position()}"> 
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
        
    </xsl:template>
    
    
    <!-- Templates de conteúdo ............................................ -->
    
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
            </html>
            <body>
                <!-- <!ELEMENT ARQELEM (TIPO,IDENTI,IMAGEM?,DESCRI,CRONO?,LUGAR,
      FREGUE,CONCEL,
CODADM?,LATITU?,LONGIT?,ALTITU?,ACESSO?,QUADRO?,TRAARQ?,DESARQ,INTERP?,DEPOSI?,
INTERE?,BIBLIO*,AUTOR,TRAARQ?,DATA)> -->
                <p><b><span style="color:#2196F3">Arqueossítio:</span> </b> <xsl:value-of select="IDENTI"/></p>
                <p><b><span style="color:#2196F3">Assunto: </span></b> <xsl:value-of select="TIPO/@ASSUNTO"/></p>
                <xsl:if test="IMAGEM"><p><b><span style="color:#2196F3">Imagem:</span> </b> <xsl:value-of select="IMAGEM/@NOME"/></p></xsl:if>
                <p><b><span style="color:#2196F3">Descrição: </span> </b> <xsl:apply-templates select="DESCRI"/></p>
                <xsl:if test="CRONO"><p><b><span style="color:#2196F3">Era Cronológica: </span> </b> <xsl:value-of select="CRONO"/></p></xsl:if>
                <p><b><span style="color:#2196F3">Lugar: </span> </b> <xsl:apply-templates select="LUGAR"/></p>
                <p><b><span style="color:#2196F3">Freguesia: </span> </b> <xsl:apply-templates select="FREGUE"/></p>
                <p><b><span style="color:#2196F3">Concelho: </span> </b> <xsl:value-of select="CONCEL"/></p>
                <xsl:if test="CODADM"><p><b><span style="color:#2196F3">Código Administrativo: </span> </b> <xsl:value-of select="CODADM"/></p></xsl:if>
                <xsl:if test="LATITU"><p><b><span style="color:#2196F3">Latitude: </span> </b> <xsl:value-of select="LATITU"/></p></xsl:if>
                <xsl:if test="LONGIT"><p><b><span style="color:#2196F3">Longitude: </span> </b> <xsl:value-of select="LONGIT"/></p></xsl:if>
                <xsl:if test="ALTITU"><p><b><span style="color:#2196F3">Altitude: </span> </b> <xsl:value-of select="ALTITU"/></p></xsl:if>
                <xsl:if test="ACESSO"><p><b><span style="color:#2196F3">Acesso: </span> </b> <xsl:apply-templates select="ACESSO"/></p></xsl:if>
                <xsl:if test="QUADRO"><p><b><span style="color:#2196F3">Quadro: </span> </b> <xsl:apply-templates select="QUADRO"/></p></xsl:if>
                <xsl:if test="TRAARQ"><p><b><span style="color:#2196F3">Trabalho(s) Arqueológicos: </span> </b> <xsl:apply-templates select="TRAARQ"/></p></xsl:if>
                <p><b><span style="color:#2196F3">Descrição Arqueológica: </span> </b> <xsl:apply-templates select="DESARQ"/></p>
                <xsl:if test="INTERP"><p><b><span style="color:#2196F3">Interpretação Arqueológica: </span> </b> <xsl:apply-templates select="INTERP"/></p></xsl:if>
                <xsl:if test="DEPOSI"><p><b><span style="color:#2196F3">Depósito(s): </span> </b> <xsl:value-of select="DEPOSI"/></p></xsl:if>
                <xsl:if test="INTERE"><p><b><span style="color:#2196F3">Interpretação Estrutural: </span> </b> <xsl:apply-templates select="INTERE"/></p></xsl:if>
                <xsl:if test="BIBLIO"><p><b><span style="color:#2196F3">Bibliografia: </span></b></p>
                    <ul>
                        <xsl:apply-templates select="BIBLIO">
                            <xsl:sort select="normalize-space(.)" lang="iso-8859-1"/>
                        </xsl:apply-templates>
                    </ul>
                </xsl:if>
                <p><b><span style="color:#2196F3">Autor: </span> </b> <xsl:value-of select="AUTOR"/></p>
                <p><b><span style="color:#2196F3">Data: </span> </b> <xsl:value-of select="DATA"/></p>
                <address> <!-- Botoes de proximo e anterior com condiçoes if -->
                    <xsl:if test="position() &gt; 1">
                        [<a href="http://localhost:7777/arqs/{position()-1}">Anterior</a>] 
                    </xsl:if>
                    <xsl:if test="position() &lt; last()">
                        [<a href="http://localhost:7777/arqs/{position()+1}">Próximo</a>]
                    </xsl:if>
                    <p>[<a href="http://localhost:7777/home#i{position()}">Início</a>]</p>
                </address>
            </body>
        </xsl:result-document>
    </xsl:template>
    
    <!-- Aplicar o template LIGA dentro dos nodos -->
    <xsl:template match="BIBLIO">
        <li><xsl:apply-templates/></li>
    </xsl:template>
    
    <xsl:template match="DESCRI">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="LUGAR">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="FREGUE">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="ACESSO">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="QUADRO">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="TRAARQ">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="DESARQ">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="INTERP">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="INTERE">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="LIGA">
        <u><xsl:value-of select="."/></u> (<i><xsl:value-of select="@TERMO"/></i>)
    </xsl:template>
    
</xsl:stylesheet>
