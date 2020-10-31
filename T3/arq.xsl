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
                    <h2 style="color:#2196F3; text-align:center;">Arqueossítios do NW Português </h2>
                    <h3> &#8594; Índice de Arqueossítios</h3>
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
                <p><b><span style="color:#2196F3">Arqueossítio:</span> </b> <xsl:value-of select="IDENTI"/></p>
                <p><b><span style="color:#2196F3">Assunto: </span></b> <xsl:value-of select="TIPO/@ASSUNTO"/></p>
                <xsl:if test="IMAGEM"><p><b><span style="color:#2196F3">Imagem:</span> </b> <xsl:value-of select="IMAGEM/@NOME"/></p></xsl:if>
                <p><b><span style="color:#2196F3">Descrição: </span> </b> <xsl:apply-templates select="DESCRI"/></p>
                <xsl:if test="CRONO"><p><b><span style="color:#2196F3">Era Cronológica: </span> </b> <xsl:value-of select="CRONO"/></p></xsl:if>
                <p><b><span style="color:#2196F3">Lugar: </span> </b> <xsl:apply-templates select="LUGAR"/></p>
                <p><b><span style="color:#2196F3">Freguesia: </span>: </b> <xsl:apply-templates select="FREGUE"/></p>
                <p><b><span style="color:#2196F3">Concelho: </span>: </b> <xsl:value-of select="CONCEL"/></p>
                <xsl:if test="CODADM"><p><b><span style="color:#2196F3">Código Administrativo: </span>: </b> <xsl:value-of select="CODADM"/></p></xsl:if>
                <xsl:if test="LATITU"><p><b><span style="color:#2196F3">Latitude: </span> </b> <xsl:value-of select="LATITU"/></p></xsl:if>
                <xsl:if test="LONGIT"><p><b><span style="color:#2196F3">Longitude: </span>: </b> <xsl:value-of select="LONGIT"/></p></xsl:if>
                <xsl:if test="ALTITU"><p><b><span style="color:#2196F3">Altitude: </span>: </b> <xsl:value-of select="ALTITU"/></p></xsl:if>
                <xsl:if test="ACESSO"><p><b><span style="color:#2196F3">Acesso: </span>: </b> <xsl:apply-templates select="ACESSO"/></p></xsl:if>
                <xsl:if test="QUADRO"><p><b><span style="color:#2196F3">Quadro: </span>: </b> <xsl:apply-templates select="QUADRO"/></p></xsl:if>
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
                <p><b><span style="color:#2196F3">Data: </span>: </b> <xsl:value-of select="DATA"/></p>
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