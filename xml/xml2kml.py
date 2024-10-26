
import xml.etree.ElementTree as ET



class Kml(object):
    """
    Genera archivo KML con puntos y líneas
    @version 1.0 17/Noviembre/2023
    @author: Juan Manuel Cueva Lovelle. Universidad de Oviedo
    """

    def __init__(self):
        """
        Crea el elemento raíz y el espacio de nombres
        """
        self.raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.raiz, 'Document')

    def addPlacemark(self, nombre, descripcion, long, lat, alt, modoAltitud):
        """
        Añade un elemento <Placemark> con puntos <Point>
        """
        pm = ET.SubElement(self.doc, 'Placemark')
        ET.SubElement(pm, 'name').text = '\n' + nombre + '\n'
        ET.SubElement(pm, 'description').text = '\n' + descripcion + '\n'
        punto = ET.SubElement(pm, 'Point')
        ET.SubElement(punto, 'coordinates').text = '\n{},{},{}\n'.format(long, lat, alt)
        ET.SubElement(punto, 'altitudeMode').text = '\n' + modoAltitud + '\n'

    def addLineString(self, nombre, extrude, tesela, listaCoordenadas, modoAltitud, color, ancho):
        """
        Añade un elemento <Placemark> con líneas <LineString>
        """
        ET.SubElement(self.doc, 'name').text = '\n' + nombre + '\n'
        pm = ET.SubElement(self.doc, 'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls, 'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls, 'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls, 'coordinates').text = '\n' + listaCoordenadas + '\n'
        ET.SubElement(ls, 'altitudeMode').text = '\n' + modoAltitud + '\n'

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement(linea, 'color').text = '\n' + color + '\n'
        ET.SubElement(linea, 'width').text = '\n' + ancho + '\n'

    def escribir(self, nombreArchivoKML):
        """
        Escribe el archivo KML con declaración y codificación
        """
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivoKML, encoding='utf-8', xml_declaration=True)

    def ver(self):
        """
        Muestra el archivo KML. Se utiliza para depurar
        """
        print("\nElemento raiz = ", self.raiz.tag)

        if self.raiz.text != None:
            print("Contenido = ", self.raiz.text.strip('\n'))  # strip() elimina los '\n' del string
        else:
            print("Contenido = ", self.raiz.text)

        print("Atributos = ", self.raiz.attrib)

        # Recorrido de los elementos del árbol
        for hijo in self.raiz.findall('.//'):  # Expresión XPath
            print("\nElemento = ", hijo.tag)
            if hijo.text != None:
                print("Contenido = ", hijo.text.strip('\n'))  # strip() elimina los '\n' del string
            else:
                print("Contenido = ", hijo.text)
            print("Atributos = ", hijo.attrib)

def verXPath(archivoXML, expresionXPath):
    """Función verXPath(archivoXML, expresionXPath)
    Visualiza por pantalla el nodo correspondiente de una expresión XPath de un archivo XML
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

    coords = list()

    # Recorrido de los elementos del árbol
    for hijo in raiz.findall(expresionXPath):  # Expresión XPath
        print("\nElemento = ", hijo.tag)
        if hijo.text != None:
            print("Contenido = ", hijo.text.strip('\n'))  # strip() elimina los '\n' del string
            coords.append(hijo.text.strip('\n'))
        else:
            print("Contenido = ", hijo.text)
        print("Atributos = ", hijo.attrib)
    # Formatea las coordenadas del circuito
    contador = 0
    coordenadas = ""
    for element in coords:
        coordenadas += element
        contador += 1
        if (contador == 3):
            coordenadas += "\n"
            contador = 0
        else:
            coordenadas += ","
    return coordenadas

def main():
    """Prueba de la función verXPath()"""
    # Expresión para obtener los tramos
    # {http://www.uniovi.es}circuito//{http://www.uniovi.es}tramos//{http://www.uniovi.es}tramo//{http://www.uniovi.es}coordenadas//*

    print(verXPath.__doc__)

    miArchivoXML = "circuitoEsquema.xml"

    miExpresionXPath = ("{http://www.uniovi.es}circuito//{http://www.uniovi.es}tramos//"
                        "{http://www.uniovi.es}tramo//{http://www.uniovi.es}coordenadas//*")



    nombreKML = "circuito.kml"

    nuevoKML = Kml()

    coordenadasCircuito = verXPath(miArchivoXML, miExpresionXPath)

    # coordenadasCircuito = ("-5.8513,43.3550,0.0\n" +
    #                     "-5.853069841342697,43.35487460099027,0.0\n" +
    #                     "-5.85260611648946,43.35423714086568,0.0\n" +
    #                     "-5.8513,43.3550,0.0")

    nuevoKML.addLineString("Circuito Losail", "1", "1",
                           coordenadasCircuito, 'relativeToGround',
                           '#ff0000ff', "5")

    """Visualización del KML creado"""
    nuevoKML.ver()

    """Creación del archivo en formato KML"""
    nuevoKML.escribir(nombreKML)
    print("Creado el archivo: ", nombreKML)


if __name__ == "__main__":
    main()