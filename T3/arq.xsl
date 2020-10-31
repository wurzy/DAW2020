<?xml version="1.0" encoding="iso-8859-1"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <xsl:output method="html" encoding="iso-8859-1" indent="yes"/>
    <xsl:template match="/">
        <xsl:result-document href="site/index.html"> <!-- gera esta ficheiro e guarda o output lá -->
            <html>
                <head>
                    <title>Arqueossítios do NW Português</title>
                </head>
                <body>
                    <h2>Arqueossítios do NW Português</h2>
                    <h3>Índice de Arqueossítios</h3>
                    <ol>
                        <xsl:apply-templates select="//ARQELEM" mode="indice"> 
                            <xsl:sort select="normalize-space(IDENTI)"
                                lang="iso-8859-1"/> <!-- Alguns titulos vinham com espaço branco e estragavam o sort
                                                         e era preciso ordenar direito por causa dos acentos portugueses -->
                        </xsl:apply-templates> <!-- Gerar o índice -->
                    </ol>
                </body>
            </html>
        </xsl:result-document>
        <xsl:apply-templates/> <!-- Gerar os registos de arq em páginas separadas -->
    </xsl:template>
    
    <!-- Templates de índice ............................................ -->
    
    <xsl:template match="ARQELEM" mode="indice"> <!-- ou tit aqui e . na linha abaixo -->
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html"> <!-- salta para o ficheiro na diretoria atual com este id no nome -->
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- Templates de conteúdo ............................................ -->

    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
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
                <p><b>Arqueossítio: </b> <xsl:value-of select="IDENTI"/></p>
                <p><b>Assunto: </b> <xsl:value-of select="TIPO/@ASSUNTO"/></p>
                <xsl:if test="IMAGEM"><p><b>Imagem: </b> <xsl:value-of select="IMAGEM/@NOME"/></p></xsl:if>
                <p><b>Descrição: </b> <xsl:apply-templates select="DESCRI"/></p>
                <xsl:if test="CRONO"><p><b>Era Cronológica: </b> <xsl:value-of select="CRONO"/></p></xsl:if>
                <p><b>Lugar: </b> <xsl:apply-templates select="LUGAR"/></p>
                <p><b>Freguesia: </b> <xsl:apply-templates select="FREGUE"/></p>
                <p><b>Concelho: </b> <xsl:value-of select="CONCEL"/></p>
                <xsl:if test="CODADM"><p><b>Código Administrativo: </b> <xsl:value-of select="CODADM"/></p></xsl:if>
                <xsl:if test="LATITU"><p><b>Latitude: </b> <xsl:value-of select="LATITU"/></p></xsl:if>
                <xsl:if test="LONGIT"><p><b>Longitude: </b> <xsl:value-of select="LONGIT"/></p></xsl:if>
                <xsl:if test="ALTITU"><p><b>Altitude: </b> <xsl:value-of select="ALTITU"/></p></xsl:if>
                <xsl:if test="ACESSO"><p><b>Acesso: </b> <xsl:apply-templates select="ACESSO"/></p></xsl:if>
                <xsl:if test="QUADRO"><p><b>Quadro: </b> <xsl:apply-templates select="QUADRO"/></p></xsl:if>
                <xsl:if test="TRAARQ"><p><b>Trabalho(s) Arqueológicos: </b> <xsl:apply-templates select="TRAARQ"/></p></xsl:if>
                <p><b>Descrição Arqueológica: </b> <xsl:apply-templates select="DESARQ"/></p>
                <xsl:if test="INTERP"><p><b>Interpretação Arqueológica: </b> <xsl:apply-templates select="INTERP"/></p></xsl:if>
                <xsl:if test="DEPOSI"><p><b>Trabalho(s) Arqueológicos: </b> <xsl:value-of select="DEPOSI"/></p></xsl:if>
                <xsl:if test="INTERE"><p><b>Interpretação Estrutural: </b> <xsl:apply-templates select="INTERE"/></p></xsl:if>
                <xsl:if test="BIBLIO"><p><b>Bibliografia:</b></p>
                    <ul>
                        <xsl:apply-templates select="BIBLIO">
                            <xsl:sort select="."/>
                        </xsl:apply-templates>
                    </ul>
                </xsl:if>
                <p><b>Autor: </b> <xsl:value-of select="AUTOR"/></p>
                <p><b>Data: </b> <xsl:value-of select="DATA"/></p>
                <address>
                    [<a href="index.html#i{generate-id()}">Início</a>] <!-- volta para a home, especificamente para o índice desta página -->
                </address>
            </body>
        </xsl:result-document>
    </xsl:template>
    
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