import xml.etree.ElementTree as ET

def getAltimetria(archivoXML, expresionDistancia, expresionAltura):
    """Función generarPerfil(archivoXML)
    Recoge las distancias y alturas del XML introducido como parámetro las cuales representan la altimetria
    """
    try:

        arbol = ET.parse(archivoXML)

    except IOError:
        print('No se encuentra el archivo ', archivoXML)
        exit()

    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()

    raiz = arbol.getroot()

    distancias = list()
    alturas = list()

    # Recorrido de las distancias
    for hijo in raiz.findall(expresionDistancia):  # Expresión XPath
        if hijo.text != None:
            distancias.append(hijo.text.strip('\n'))
    # Recorrido de las alturas
    for hijo in raiz.findall(expresionAltura):  # Expresión XPath
        if hijo.text != None:
            alturas.append(hijo.text.strip('\n'))
    return distancias, alturas


def crearSVGAltimetria(alturas, distancias, archivoFinal, escala_global = 1):
    # Convertir las listas de strings a enteros
    alturas = list(map(int, alturas))
    distancias = list(map(int, distancias))

    # Aplicar la escala global
    alturas = list(map(lambda x: x * escala_global, alturas))
    distancias = list(map(lambda x: x * escala_global, distancias))

    svg = ET.Element('svg', xmlns="http://www.w3.org/2000/svg", width="1000", height="500")

    # Definir punto de inicio y escalas
    x0 = 50
    y0 = 450  # y-coordinate should be inverted for SVG
    altura_max = max(alturas)
    distancia_max = sum(distancias)
    escala_x = 900 / distancia_max
    escala_y = 400 / altura_max

    # Dibujar ejes
    ET.SubElement(svg, 'line', x1=str(x0), y1=str(y0), x2=str(x0 + 900), y2=str(y0), stroke="black")
    ET.SubElement(svg, 'line', x1=str(x0), y1=str(y0), x2=str(x0), y2=str(y0 - 400), stroke="black")

    # Dibujar línea de altimetría
    x_actual = x0
    y_actual = y0 - alturas[0] * escala_y
    puntos_polilinea = [(x_actual, y_actual)]
    for altura, distancia in zip(alturas, distancias):
        next_x = x_actual + distancia * escala_x
        next_y = y0 - altura * escala_y
        puntos_polilinea.append((next_x, next_y))
        x_actual, y_actual = next_x, next_y

    # Cerrar la línea para crear el efecto suelo
    puntos_polilinea.append((x_actual, y0))  # Desde el último punto hasta el eje x
    puntos_polilinea.append((x0, y0))  # De vuelta al punto de inicio del eje x

    # Convertir los puntos a una cadena de puntos para el elemento polyline
    str_puntos_polilinea = ' '.join(f'{x},{y}' for x, y in puntos_polilinea)
    ET.SubElement(svg, 'polyline', points=str_puntos_polilinea, stroke="blue", fill="lightblue", stroke_width="2")

    # Guardar el archivo SVG
    tree = ET.ElementTree(svg)
    tree.write(archivoFinal)

def main():
    xml = "xml\circuitoEsquema.xml"
    expresionDistancias = ("{http://www.uniovi.es}circuito//{http://www.uniovi.es}tramos//"
                        "{http://www.uniovi.es}tramo//{http://www.uniovi.es}distancia")
    expresionAltura = ("{http://www.uniovi.es}circuito//{http://www.uniovi.es}tramos//"
                        "{http://www.uniovi.es}tramo//{http://www.uniovi.es}coordenadas//"
                        "{http://www.uniovi.es}altitud")
    distancias, alturas = getAltimetria(xml, expresionDistancias, expresionAltura)
    crearSVGAltimetria(alturas, distancias, "xml/perfil.svg", 0.1)

if __name__ == '__main__':
    main()