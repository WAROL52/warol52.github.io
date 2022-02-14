canvas = document.querySelector('canvas')
crayon = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 250;

function dessinerRectangle(x, y, long, larg) {
    crayon.fillStyle = "black";
    crayon.strokeStyle = "red";
    //crayon.strokeRect(x,y,long,larg)
    crayon.fillRect(x, y, long, larg)
}

function dessinerCercle(x, y, rayon, angleDepart, angleArriver, couleur, couleurContour, taille = 1) {
    crayon.beginPath()
    crayon.fillStyle = couleur;
    crayon.strokeStyle = couleurContour;
    crayon.lineWidth = taille;
    crayon.arc(x, y, rayon, angleDepart, angleArriver, false);
    crayon.fill();
    crayon.stroke();
}

function dessiner_point(x, y, couleur, taille = 1) {
    dessinerCercle(x, y, 2 + taille, 0, Math.PI * 2, couleur, couleur, taille)
}
//--------------
class Point {
    /**
     * Creation d'un Point de Coordoné (x et y )
     * @param {string} Nom 
     * @param {number} x 
     * @param {number} y 
     * @param {string} couleur 
     */
    constructor(Nom, x, y, couleur = "black") {
        this.nom = Nom;
        this.x = x;
        this.y = y;
        this.color = couleur;
        this.nameIsShow = true;
        this.positionIsShow = false;
        this.canDrawing = true;
        this.font = "12px Arial";
        this.tailleDeLigne = 1
    }
    /**
     * changer la taille su point
     * @param{Number}valeur
     */
    changerTaillePoint(valeur) {
        if(!isNaN(valeur)){
            this.tailleDeLigne = valeur;
        }
    }
    /**
     * Afficher les coordonnés (x ; y) du point dans le repere
     * @param {Boolean} value 
     */
    afficherPosition(value = true) {
        this.positionIsShow = Boolean(value);
    }
    /**
     * Afficher le Nom du Point dans le repere 
     * @param {Boolean} value 
     */
    afficherNom(value = true) {
        this.nameIsShow = Boolean(value);
    }
    dessinerFigure() {
        this.dessinerPoint()
    }
    /**
     * Dessiner ce point dans le repere
     */
    dessinerPoint() {
        dessiner_point(this.x, this.y, this.color, this.tailleDeLigne);
        if (this.nameIsShow) {
            crayon.font = this.font;
            crayon.fillText(this.nom, this.x + 2 * this.tailleDeLigne, this.y - 5);
            crayon.fillText(this.nom, this.x + 2 * this.tailleDeLigne, this.y - 5);
        }
        if (this.positionIsShow) {
            var texte = "(" + Math.round(this.x) + " ; " + Math.round(this.y) + ")";
            crayon.font = this.font;
            crayon.fillText(texte, this.x + 2 * this.tailleDeLigne, this.y + 15);
            crayon.fillText(texte, this.x + 2 * this.tailleDeLigne, this.y + 15);
        }
    }
    pousserPoint(x,y){
        this.x += x;
        this.y += y;
    }
    /**
     * changer directement les coordonnés de ce point
     * @param {number} x 
     * @param {number} y 
     */
    deplacer(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * changer directement la couleur de ce point
     * @param {string} couleur 
     */
    changerCouleur(couleur) {
        this.color = couleur;
    }
}
class Segment {
    /**
     * Creation d'un segment a partir de 2 objets de type point
     * (les coordonnées de ces poins doivent etre different)
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {string} couleur 
     */
    constructor(pointA, pointB, couleur = "black") {
        this.pointA = pointA;
        this.pointB = pointB;
        this.colorSegment = couleur;
        // this.pointA.changerCouleur("black")
        // this.pointB.changerCouleur("black")
        this.longueur = Math.sqrt(Math.pow((this.pointA.x - this.pointB.x), 2) + Math.pow((this.pointA.y - this.pointB.y), 2))
        this.pointMilieu = new Point("M", (this.pointA.x + this.pointB.x) / 2, (this.pointA.y + this.pointB.y) / 2, "black")
        this.pointMilieuIsShow = false;
        this.tailleDeLigne = 1
    }
    /**
     * changerla taille du ligne du segment
     * @param {Number} value 
     */
    changerTailleLigne(value = 1) {
        if (!isNaN(value)) {
            this.tailleDeLigne = value;
        }
    }
    /**
     * Changer la couleur de ce segment
     * @param {string} couleur 
     */
    changerCouleurDuSegment(couleur) {
        this.colorSegment = couleur;
    }
    /**
     * afficher dans le repere les coordonnées de tous les objets
     *  de type point appartenent a ce segment
     * @param {Boolean} value 
     */
    afficherPosition(value = true) {
        this.pointA.afficherPosition(Boolean(value))
        this.pointB.afficherPosition(Boolean(value))
        this.pointMilieu.afficherPosition(Boolean(value))
    }
    /**
     * afficher dans le repere les Nom de tous les objets
     *  de type point appartenent a ce segment
     * @param {Boolean} value 
     */
    afficherNom(value) {
        this.pointA.afficherNom(Boolean(value))
        this.pointB.afficherNom(Boolean(value))
        this.pointMilieu.afficherNom(Boolean(value))
    }
    /**
     * Dessiner dans le repere un point qui est milieu de ce segment 
     * @param {Bolean} value 
     */
    afficherPointMilieu(value = true) {
        this.pointMilieuIsShow = Boolean(value);
    }
    dessinerFigure() {
        this.dessinerSegment()
    }
    /**
     * dessiner  ce segment dans le repere
     */
    dessinerSegment() {
        this.pointA.dessinerPoint();
        this.pointB.dessinerPoint();
        if (this.pointMilieuIsShow) {
            this.pointMilieu.dessinerPoint();
        }
        crayon.beginPath();
        crayon.lineWidth = this.tailleDeLigne;
        crayon.strokeStyle = this.colorSegment
        crayon.moveTo(this.pointA.x, this.pointA.y);
        crayon.lineTo(this.pointB.x, this.pointB.y);
        crayon.stroke();
    }
    /**
     * changer les coordonnées du point A de ce segment . 
     * Ce changement va ausi affecter les coordonnées du point M , 
     * qui est le milieu de ce segment
     * @param {number} x 
     * @param {number} y 
     */
    deplacerPointA(x, y) {
        this.pointA.deplacer(x, y)
        this.pointMilieu.deplacer((this.pointA.x + this.pointB.x) / 2, (this.pointA.y + this.pointB.y) / 2)
    }
    /**
     * changer les coordonnées du point B de ce segment . 
     * Ce changement va ausi affecter les coordonnées du point M  , 
     * qui est le milieu de ce segment
     * @param {number} x 
     * @param {number} y 
     */
    deplacerPointB(x, y) {
        this.pointB.deplacer(x, y)
        this.pointMilieu.deplacer((this.pointA.x + this.pointB.x) / 2, (this.pointA.y + this.pointB.y) / 2)
    }
    /**
     * changer les coordonnées du point M , le milieu de ce segment...
     *  Ce changement va ausi affecter les coordonnées du point A et B , 
     * qui est les 2 points d'extremité de ce segment
     * @param {number} x 
     * @param {number} y 
     */
    deplacerPointMilieu(x, y) {
        var deltaX = x - this.pointMilieu.x;
        var deltaY = y - this.pointMilieu.y;
        this.pousser(deltaX, deltaY);
    }
    /**
     * Pousser le segment de x et y valeur
     * @param {number} x 
     * @param {number} y 
     */
    pousser(x, y) {
        this.deplacerPointA(this.pointA.x + x, this.pointA.y + y);
        this.deplacerPointB(this.pointB.x + x, this.pointB.y + y);
    }
    /**
     * Obtenir deux points appartenant a la droite mediatrice de ce segment 
     * @returns array
     */
    get2PointMediatriciceSegment() {
        if (this.pointA.y == this.pointB.y) {
            var pointD = new Point("D", this.pointMilieu.x, this.pointMilieu.y + 50)
        } else {
            var a2 = Math.pow((this.pointA.y - this.pointB.y) / (this.pointA.x - this.pointB.x), -1) * -1
            var b2 = this.pointMilieu.y - a2 * this.pointMilieu.x

            var x2 = this.pointMilieu.x + 50
            var pointD = new Point("D", x2, a2 * x2 + b2)
        }
        return [this.pointMilieu, pointD]
    }
}
class Droite extends Segment {
    /**
     * Creation d'une droite a partir de 2 objets de type Point.
     *  (leur coordonnées doivent etre different )
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {string} couleur 
     */
    constructor(pointA, pointB, couleur = "black") {
        super(pointA, pointB, couleur)
        if (this.pointA.x == this.pointB.x && this.pointA.y == this.pointB.y) {
            console.error("les coordonné des points " + this.pointA.nom + " et " + this.pointB.nom +
                " qui forment ce droite ne doit pas etre egaux SI NON Erreur")
            return null
        } else if (this.pointA.x != this.pointB.x && this.pointA.y == this.pointB.y) {
            this.typeDroite = 1
        } else if (this.pointA.x == this.pointB.x && this.pointA.y != this.pointB.y) {
            this.typeDroite = 2
        } else {
            this.typeDroite = 3
            this.a = (this.pointA.y - this.pointB.y) / (this.pointA.x - this.pointB.x);
            this.b = this.pointA.y - this.a * this.pointA.x
        }
        this.couleurDuDroite = couleur;
    }
    /**
     * changer la couleur du droite
     * @param {string} couleur 
     */
    changerCouleurDuDroit(couleur) {
        this.couleurDuDroite = couleur;
    }
    /**
     * obtenir la valeur de  x de l'equation y=ax+b ; 
     * la valeur de y doit etre dans le parametre
     * @param {number} valueY 
     * @returns number
     */
    getSolutionX_ByValueY(valueY) {
        if (this.typeDroite == 1) {
            return this.pointA.x;
        } else if (this.typeDroite == 2) {
            return this.pointA.x;
        } else {
            return (valueY - this.b) / this.a;
        }
    }
    /**
     * obtenir la valeur de  y de l'equation y=ax+b ; 
     * la valeur de x doit etre dans le parametre
     * @param {number} valueX
     * @returns number
     */
    getSolutionY_ByValueX(valueX) {
        if (this.typeDroite == 1) {
            return this.pointA.y;
        } else if (this.typeDroite == 2) {
            return this.pointA.y;
        } else {
            return this.a * valueX + this.b;
        }
    }
    dessinerFigure() {
        this.dessinerDroite()
    }
    /**
     * Dessiner ce droite dans le repere ; 
     * par convontion , la valeur x0=0 et x1=500
     * sera utiliser pour tracer ce droite
     *  de l'equation : y=ax+b 
     */
    dessinerDroite() {
        if (this.typeDroite == 1) {
            var x0 = 0;
            var y0 = this.pointA.y;
            var x1 = 1500;
            var y1 = this.pointB.y;
        } else if (this.typeDroite == 2) {
            var x0 = this.pointA.x;
            var y0 = 0;
            var x1 = this.pointB.x;
            var y1 = 1500;
        } else {
            var x0 = 0
            var x1 = 500;
            var y0 = this.getSolutionY_ByValueX(x0);
            var y1 = this.getSolutionY_ByValueX(x1);
        }
        crayon.beginPath();
        crayon.lineWidth = this.tailleDeLigne;
        crayon.strokeStyle = this.couleurDuDroite;
        crayon.moveTo(x0, y0);
        crayon.lineTo(x1, y1);
        crayon.stroke();
    }
    /**
     * Obtenir une droite qui est la mediatrice de ce segment
     * @returns Droite
     */
    getDroiteMediatriceSegment() {
        var listePoint = this.get2PointMediatriciceSegment()
        return new Droite(listePoint[0], listePoint[1]);
    }
    /**
     * Obtenir la distance entre ce droite et un Point
     * @param {Point} pointC 
     * @returns number
     */
    getDistance_Droite_Point(pointC) {
        if (this.typeDroite == 1) {
            return Math.abs(pointC.y - this.pointA.y)
        } else if (this.typeDroite == 2) {
            return Math.abs(pointC.x - this.pointA.x)
        } else if (this.typeDroite == 3) {
            var distance = Math.abs(this.a * pointC.x * -1 + pointC.y + this.b * -1) / Math.sqrt(Math.pow(this.a * -1, 2) + Math.pow(1, 2));
            return Math.round(distance * 100) / 100
        }
    }
    /**
     * Obtenir un point projeté sur cette droite a partir du 'pointC'
     * @param {Point} pointC 
     * @returns Point
     */
    getProjectionDunPoint(pointC) {
        if (this.typeDroite == 1) {
            var x2 = pointC.x
            var y2 = this.pointA.y
        } else if (this.typeDroite == 2) {
            var x2 = this.pointA.x
            var y2 = pointC.y
        } else if (this.typeDroite == 3) {
            var a2 = -1 / this.a;
            var b2 = pointC.y - pointC.x * a2;
            var x2 = (this.b - b2) / (a2 - this.a);
            var y2 = a2 * x2 + b2;
        }
        return new Point(pointC.nom + '"', x2, y2)
    }
    /**
     * Verifier si le 'pointC' appartient a cette droite 
     * @param {Point} pointC 
     * @returns Boolean
     */
    verifiSiUnPoint_AppartientAceDroit(pointC) {
        if (this.typeDroite == 1) {
            return pointC.y == this.pointA.y
        } else if (this.typeDroite == 2) {
            return pointC.x == this.pointA.x
        } else if (this.typeDroite == 3) {
            return Math.round(pointC.y * 100) / 100 == Math.round((this.a * pointC.x + this.b) * 100) / 100;
        }
    }
    verifiSiUnPoint_AppartientAceSegment(pointC) {
        var condition1 = this.verifiSiUnPoint_AppartientAceDroit(pointC)
        if (condition1) {
            var distance1 = new Segment(this.pointA, pointC).longueur
            var distance2 = new Segment(this.pointB, pointC).longueur
            return this.longueur == distance1 + distance2
        }
    }
    /**
     * Obtenir le point d'intersection entre ce droite et la 'droiteC'
     * // mbola misy bug (2 droite kof parallele tsy mety)
     * @param {Droite} droiteC 
     * @returns Point
     */
    getPointIntersection_Droite_Droite(droiteC) {
        if (droiteC.typeDroite == 1 && this.typeDroite == 3) {
            var xI = this.getSolutionX_ByValueY(droiteC.pointA.y)
            var yI = droiteC.pointA.y
        } else if (droiteC.typeDroite == 2 && this.typeDroite == 3) {
            var xI = droiteC.pointA.x
            var yI = this.getSolutionY_ByValueX(xI)
        } else if (droiteC.typeDroite == 3 && this.typeDroite == 3) {
            var xI = (this.b - droiteC.b) / (droiteC.a - this.a)
            var yI = droiteC.a * xI + droiteC.b
        } else if (droiteC.typeDroite == 3 && this.typeDroite == 1) {
            var xI = droiteC.getSolutionX_ByValueY(this.pointA.y)
            var yI = this.pointA.y
        } else if (droiteC.typeDroite == 3 && this.typeDroite == 2) {
            var xI = this.pointA.x
            var yI = droiteC.getSolutionY_ByValueX(xI)
        }
        return new Point("I", xI, yI)
    }
    /**
     * Obtenir une droite parallele a ce droite passant par le 'pointC'
     * @param {Point} pointC 
     * @returns Droite
     */
    getDroiteParallelePassantParUnpoint(pointC) {
        if (this.typeDroite == 1) {
            var pointD = new Point("D", this.pointA.x, pointC.y)
        } else if (this.typeDroite == 2) {
            var pointD = new Point("D", pointC.x, this.pointA.y)
        } else if (this.typeDroite == 3) {
            var a2 = this.a
            var b2 = pointC.y - a2 * pointC.x
            var pointD = new Point("D", this.pointA.x, a2 * this.pointA.x + b2)
        }
        return new Droite(pointC, pointD)
    }
    /**
     * Obtenir une droite perpendiculaire a ce droite passant par le 'pointC'
     * @param {Point} pointC 
     * @returns Droite
     */
    getDroitePerpendiculaiirePassantParUnpoint(pointC) {
        var C = this.getProjectionDunPoint(pointC);
        return new Droite(pointC, C);
    }
}
class arc extends Droite {
    /**
     * Creation d'un arc a partir d'un 'pointA' et d'un 'rayon'
     * @param {Point} pointA 
     * @param {Number} rayon 
     * @param {Number} angleDepart 
     * @param {Number} angleDeRotation 
     * @param {Boolean} sensMontre 
     */
    constructor(pointA, rayon, angleDepart, angleDeRotation, sensMontre = true) {
        super(pointA, new Point("B", pointA.x + rayon, pointA.y), "black")
        this.rayon = rayon;
        this.angle = angleDeRotation;
        this.isSensMontre = sensMontre;
        this.angleDepart = angleDepart;
        this.colorArc = "white"
        this.colorBorderArc = "black"
        this.couleurCercleIsColored = false;
        this.couleurContourCercleIsColored = true;
    }
    /**
     * Changer la position de ce cercle . La valeur du rayon ne serai pas affectée
     * @param {Number} x 
     * @param {Number} y 
     */
    deplacerArc(x, y) {
        this.pointA.x = x;
        this.pointA.y = y;
        this.pointB.x = this.pointA.x + this.rayon;
        this.pointB.y = this.pointA.y;
    }
    pousser(x,y){
        this.pointA.x += x;
        this.pointA.y += y;
        this.pointB.x = this.pointA.x + this.rayon;
        this.pointB.y = this.pointA.y;
    }
    /**
     * Pousser l'arc de x et y valeur. La valeur du rayon ne serai pas affectée
     * @param {Number} x 
     * @param {Number} y 
     */
    pousserArc(x, y) {
        this.pointA.x += x;
        this.pointA.y += y;
        this.pointB.x = this.pointA.x + this.rayon;
        this.pointB.y = this.pointA.y;
    }
    /**
     * changer la couleur de cette arc
     * @param {string} color 
     */
    changerColorArc(color) {
        this.colorArc = color;
    }
    /**
     * changer la couleur du contour de cette arc
     * @param {string} color 
     */
    changerColorContourArc(color) {
        this.colorBorderArc = color
    }
    dessinerFigure() {
        this.dessinerArc()
    }
    /**
     * dessiner cette l'arc dans le repere
     */
    dessinerArc() {
        crayon.beginPath()
        crayon.strokeStyle = this.colorBorderArc
        crayon.fillStyle = this.colorArc
        crayon.lineWidth = this.tailleDeLigne;
        crayon.arc(this.pointA.x, this.pointA.y, this.rayon, this.angleDepart, this.angle, this.isSensMontre);
        if (this.couleurContourCercleIsColored) {
            crayon.stroke()
        }
        if (this.couleurCercleIsColored) {
            crayon.fill()
        }
    }
    /**
     * afficher ou pas la Couleur du  Contour de ce Cercle
     * @param {Boolean} value 
     */
    afficherCouleurContourCercle(value = true) {
        this.couleurContourCercleIsColored = Boolean(value);
    }
    /**
     * afficher ou pas la Couleur de ce Cercle
     * @param {Boolean} value 
     */
    afficherCouleurCercle(value = true) {
        this.couleurCercleIsColored = Boolean(value);
    }
}

class Cercle extends arc {
    /**
     * Creation d'un cercle a partir d'un 'pointA' et de 'rayon'
     * @param {Point} pointA 
     * @param {Number} rayon 
     * @param {String} couleur 
     */
    constructor(pointA, rayon, couleur = "white") {
        super(pointA, rayon, 0, Math.PI * 2);
        this.changerColorArc(couleur);
        this.changerColorContourArc(couleur);
    }
    dessinerFigure() {
        this.dessinerArc()
        this.dessinerCentreCercle()
        this.dessinerSegment()
    }
    /**
     * Dessiner le centre de ce cercle
     */
    dessinerCentreCercle() {
        this.pointA.dessinerPoint();
    }
    /**
     * Verifier si le 'pointC' est sur le cercle
     * @param {Point} pointC 
     * @returns Boolean
     */
    verifi_si_unPoint_est_surCeCercle(pointC) {
        return this.rayon == new Segment(this.pointA, pointC).longueur;
    }
    /**
     * Verifier si le 'pointC' est dans le cercle
     * @param {Point} pointC 
     * @returns Boolean
     */
    verifi_si_unPoint_est_dansCeCercle(pointC) {
        return this.rayon > new Segment(this.pointA, pointC).longueur;
    }
    /**
     * Obtenier une droite tangeante a ce cercle et passe sur ce le 'pointC' qui est sur 
     * Ce cercle
     * @param {pointC} pointC 
     * @returns Droite
     */
    getDroiteTangeant_cercle_point(pointC) {
        if (this.verifi_si_unPoint_est_surCeCercle(pointC)) {
            if (pointC.y == this.pointA.y) {
                var x2 = pointC.x;
                var y2 = pointC.y + 50;
            } else {
                var a2 = -(pointC.x - this.pointA.x) / (pointC.y - this.pointA.y);
                var b2 = pointC.y - a2 * pointC.x
                var x2 = pointC.x + 50
                var y2 = a2 * x2 + b2
            }
            var tan = new Droite(pointC, new Point("T", x2, y2))
            return tan;
        } else {
            return null;
        }
    }
    /**
     * Obtenir 2 Droite tangeante a ce cercle . 
     * ces 2 Droite passent par le 'pointC' qui est a 
     * l'exterieur de ce cercle
     * @param {Point} pointC 
     * @returns [Droite,Droite]
     */
    get2DroiteTangeant_cercle_point(pointC) {
        var c1 = new CercleDeCentre_milieuSegment(this.pointA, pointC)
        var listeP = this.get2PointIntersection_cercle_cercle(c1)
        var d1 = new Droite(pointC, listeP[0])
        var d2 = new Droite(pointC, listeP[1])
        return [d1, d2]
    }
    /**
     * Obtenir deux Point t'intersection de ce cercle et du 'cercleC'
     * @param {Cercle} cercleC 
     * @returns [Cercle,cercle]
     */
    get2PointIntersection_cercle_cercle(cercleC) {
        if (cercleC.pointA.y == this.pointA.y) {
            var RR = cercleC.rayon ** 2 - this.rayon ** 2
            var x1x0 = -1 * cercleC.pointA.x ** 2 + this.pointA.x ** 2
            var y0_y1 = (this.pointA.x - cercleC.pointA.x)
            var x1 = (RR + x1x0) / (2 * y0_y1)
            var listPoint = this.get2PointIntersection_cercle_axeX(x1)
            return listPoint;
        } else {
            var RR = cercleC.rayon ** 2 - this.rayon ** 2
            var x1x0 = -1 * cercleC.pointA.x ** 2 + this.pointA.x ** 2
            var y1y0 = -1 * cercleC.pointA.y ** 2 + this.pointA.y ** 2
            var y0_y1 = (this.pointA.y - cercleC.pointA.y)
            var N = (RR + x1x0 + y1y0) / (2 * y0_y1)
            var pt = (this.pointA.x - cercleC.pointA.x) / (this.pointA.y - cercleC.pointA.y)
            var a1 = pt ** 2 + 1;
            var b1 = 2 * this.pointA.y * pt - 2 * N * pt - 2 * this.pointA.x;
            var x0y0 = (this.pointA.x ** 2) + (this.pointA.y ** 2)
            var NR0 = (N ** 2) - (this.rayon ** 2)
            var y0N = (this.pointA.y) * N * -2
            var c1 = x0y0 + NR0 + y0N
            var delta = Math.pow(b1, 2) - 4 * a1 * c1
            if (delta > 0) {
                var x1 = (-b1 - Math.sqrt(delta)) / (2 * a1);
                var x2 = (-b1 + Math.sqrt(delta)) / (2 * a1);
                var R1 = new Point("R1", x1, N - x1 * pt)
                var R2 = new Point("R2", x2, N - x2 * pt)
                return [R1, R2]
            } else if (delta == 0) {
                var x1 = (-b1) / 2 * a1;
                return new Point("R1", x1, cercleC.a * x1 + cercleC.b)
            }
        }
    }
    /**
     * Obtenir 2 point d'intersection de ce cercle et d'une Droite 
     *  qui est parallele a l'axe y de l'equation (D):x=a 
     * @param {number} x 
     * @returns [Point,Point]
     */
    get2PointIntersection_cercle_axeX(x) {
        var p1 = new Point("P1", x, 20);
        var p2 = new Point("P2", x, 50);
        var d1 = new Droite(p1, p2)
        return this.get2PointIntersection_cercle_droite(d1)
    }
    /**
     * Obtenir 2 point d'intersection de ce cercle et d'une Droite 
     *  qui est parallele a l'axe x de l'equation (D):y=a 
     * @param {number} y
     * @returns [Point,Point]
     */
    get2PointIntersection_cercle_axeY(y) {
        var p1 = new Point("P1", 20, y);
        var p2 = new Point("P2", 50, y);
        var d1 = new Droite(p1, p2)
        return this.get2PointIntersection_cercle_droite(d1)
    }
    /**
     * Obtenir 2 Point d'intersection entre ce cercle et la 'droiteC' 
     *  Si la 'droiteC' est tangeante a ce cercle alors une seul Point sera returnée
     * @param {Droite} droiteC 
     * @returns [Point,Point]
     */
    get2PointIntersection_cercle_droite(droiteC) {
        if (droiteC.typeDroite == 1) {

            // ALGO

            // (x - this.pointA.x)**2 + (y - this.pointA.y)**2 - r**2=0 avec y=droitC.point.y 
            // (x - this.pointA.x)**2 + (droitC.point.y  - this.pointA.y)**2 - r**2=0
            // var c0=(droitC.point.y  - this.pointA.y)**2 - r**2
            // (x - this.pointA.x)**2 + c0 =0
            // x**2 x*-2*this.pointA.x+ this.pointA.x**2 +c0=0
            //var c00=c0+this.pointA.x**2
            // x**2 x*-2*this.pointA.x+ c00 =0
            //var a1= 1
            //var b1=-2*this.pointA.x
            //var c1=c00
            var c0 = (droiteC.pointA.y - this.pointA.y) ** 2 - this.rayon ** 2
            var c00 = c0 + this.pointA.x ** 2
            var a1 = 1;
            var b1 = -2 * this.pointA.x
            var c1 = c00
            var delta = Math.pow(b1, 2) - 4 * a1 * c1
            if (delta > 0) {
                var x1 = (-b1 - Math.sqrt(delta)) / (2 * a1);
                var x2 = (-b1 + Math.sqrt(delta)) / (2 * a1);
                var R1 = new Point("R1", x1, droiteC.pointA.y)
                var R2 = new Point("R2", x2, droiteC.pointA.y)
                return [R1, R2]
            } else if (delta == 0) {
                var x1 = (-b1) / 2 * a1;
                return new Point("R1", x1, droiteC.a * x1 + droiteC.b)
            }
        } else if (droiteC.typeDroite == 2) {

            // ALGO

            // (x - this.pointA.x)**2 + (y - this.pointA.y)**2 - r**2=0 avec x=droitC.point.x 
            // (y - this.pointA.y)**2 + (droitC.point.x  - this.pointA.x)**2 - r**2=0
            // var c0=(droitC.point.x  - this.pointA.x)**2 - r**2
            // (y - this.pointA.y)**2 + c0 =0
            // y**2 y*-2*this.pointA.y+ this.pointA.y**2 +c0=0
            //var c00=c0+this.pointA.y**2
            // y**2 y*-2*this.pointA.y+ c00 =0
            //var a1= 1
            //var b1=-2*this.pointA.y
            //var c1=c00
            var c0 = (droiteC.pointA.x - this.pointA.x) ** 2 - this.rayon ** 2
            var c00 = c0 + this.pointA.y ** 2
            var a1 = 1;
            var b1 = -2 * this.pointA.y
            var c1 = c00
            var delta = Math.pow(b1, 2) - 4 * a1 * c1
            if (delta > 0) {
                var y1 = (-b1 - Math.sqrt(delta)) / (2 * a1);
                var y2 = (-b1 + Math.sqrt(delta)) / (2 * a1);
                var R1 = new Point("R1", droiteC.pointA.x, y1)
                var R2 = new Point("R2", droiteC.pointA.x, y2)
                return [R1, R2]
            } else if (delta == 0) {
                var x1 = (-b1) / 2 * a1;
                return new Point("R1", x1, droiteC.a * x1 + droiteC.b)
            }
        } else if (droiteC.typeDroite == 3) {

            // ALGO

            // (x - this.pointA.x)**2 + (y - this.pointA.y)**2 - r**2=0 et y=droitC.a*x+droitC.b
            // (x-this.pointA.x)**2 + (droitC.a*x + droitC.b - this.pointA.y)**2 - r**2=0
            // var c0=droitC.b - this.pointA.y
            //(x - this.pointA.x )**2 + (droitC.a*x + c0)**2 - r**2=0
            //(x**2 - 2*x*this.pointA.x + this.pointA.x**2) + ((droitC.a*x)**2 + 2*(droitC.a*x)*c0 +c0**2 ) -r**2 =0
            // x**2 - 2*x*this.pointA.x + this.pointA.x**2 + (droitC.a**2)*x**2 + 2*(droitC.a*x)*c0 + c0**2 -r**2 =0
            //(x**2 + (droitC.a**2)*x**2)+ (- 2*x*this.pointA.x + 2*(droitC.a*x)*c0 )+ (this.pointA.x**2 + c0**2 -r**2 )=0
            // (x**2)(1+(droitC.a**2)) (x)(- 2*this.pointA.x + 2*droitC.a*c0 ) + (this.pointA.x**2 + c0**2 -r**2 )=0
            // a1=(1+(droitC.a**2))
            // b1=(- 2*this.pointA.x + 2*droitC.a*c0 )
            // c0=(this.pointA.x**2 + c0**2 -r**2 )
            // a1*x**2 + b1*x + c0 = 0 delta= b1**2 - 4*a1*c0

            var c = droiteC.b - this.pointA.y
            var a1 = 1 + Math.pow(droiteC.a, 2);
            var b1 = -2 * this.pointA.x + 2 * droiteC.a * c
            var c1 = this.pointA.x ** 2 + c ** 2 - this.rayon ** 2
            var delta = Math.pow(b1, 2) - 4 * a1 * c1
            if (delta > 0) {
                var x1 = (-b1 - Math.sqrt(delta)) / (2 * a1);
                var x2 = (-b1 + Math.sqrt(delta)) / (2 * a1);
                var R1 = new Point("R1", x1, droiteC.a * x1 + droiteC.b)
                var R2 = new Point("R2", x2, droiteC.a * x2 + droiteC.b)
                return [R1, R2]
            } else if (delta == 0) {
                var x1 = (-b1) / 2 * a1;
                return new Point("R1", x1, droiteC.a * x1 + droiteC.b)
            }
        }

    }
    /**
     * Dessiner le rayon de ce cercle
     */
    dessinerRayonCercle() {
        this.dessinerSegment();
    }
}

class CercleDeRayon_longueurSegment extends Cercle {
    /**
     * Creation d'un cercle tel que : son rayon est egale a la longueur d'un segment 
     * formé par le 'pointA' et 'pointB' . Et son centre est le 'pointA'
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {String} couleur 
     */
    constructor(pointA, pointB, couleur = "white") {
        super(pointA, new Segment(pointA, pointB).longueur, couleur)
        this.segmentPere = new Droite(pointA, pointB)
    }
    dessinerFigure() {
        this.dessinerArc()
        this.dessinerCentreCercle()
        this.dessinerSegment()
        this.segmentPere.dessinerSegment()
    }
}
class CercleDeRayon_moitierSegment extends Cercle {
    /**
     * Creation d'un cercle tel que : son rayon est egale a la moitier de la  longueur d'un segment 
     * formé par le 'pointA' et 'pointB' . Et son centre est le 'pointA'
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {String} couleur 
     */
    constructor(pointA, pointB, couleur = "white") {
        super(pointA, new Segment(pointA, pointB).longueur / 2, couleur)
        this.segmentPere = new Droite(pointA, pointB)
    }
    dessinerFigure() {
        this.dessinerArc()
        this.dessinerCentreCercle()
        this.dessinerSegment()
        this.segmentPere.dessinerSegment()
    }
}
class CercleDeCentre_milieuSegment extends Cercle {
    /**
     * Creation d'un cercle tel que : son diametre est egale a la  longueur d'un segment 
     * formé par le 'pointA' et 'pointB' . Et son centre est le 'pointM' qui est le milieu du segment
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {String} couleur 
     */
    constructor(pointA, pointB, couleur = "white") {
        var M = new Segment(pointA, pointB).pointMilieu
        super(M, new Segment(pointA, pointB).longueur / 2, couleur)
        this.segmentPere = new Droite(pointA, pointB)
    }
    dessinerFigure() {
        this.dessinerArc()
        this.dessinerCentreCercle()
        this.dessinerSegment()
        this.segmentPere.dessinerSegment()
    }
}
class S_D_C extends CercleDeCentre_milieuSegment {
    /**
     * Creation d'un Segment , d'une Droite et d'un cercle tel que : son diametre est egale a la  longueur d'un segment 
     * formé par le 'pointA' et 'pointB' . Et son centre est le 'pointM' qui est le milieu du segment 
     *  C'est t'une classe qui serve a la reation d'un figure plus complexe 
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {String} couleur
     */
    constructor(pointA, pointB, couleur = "white") {
        super(pointA, pointB, couleur)
    }
    /**
     * Obtenir le point A du S_D_C
     * @returns Point
     */
    get getPointA() {
        return this.segmentPere.pointA
    }
    /**
     * Obtenir le point B du S_D_C
     * @returns Point
     */
    get getPointB() {
        return this.segmentPere.pointB
    }
    /**
     * Obtenir le point P milieu du S_D_C
     * @returns Point
     */
    get getPointMilieuP() {
        return this.segmentPere.pointMilieu
    }
    /**
     * Obtenir la longueur du S_D_C
     * @returns Point
     */
    get getlongeur() {
        return this.segmentPere.longueur
    }
    dessinerFigure() {
        this.dessinerArc()
        this.dessinerCentreCercle()
        this.dessinerSegment()
        this.dessinerRayonCercle()
    }
    /**
     * Dessiner le rayon de ce cercle
     */
    dessinerRayonCercle() {
        new Segment(this.pointA, this.pointB).dessinerSegment()
    }
    /**
     * Dessiner le diametre de ce cercle
     */
    dessinerSegment() {
        this.segmentPere.dessinerSegment()
    }
    /**
     * Dessiner Une droite
     */
    dessinerDroite() {
        this.segmentPere.dessinerDroite()
    }
}
class Triangle {
    /**
     * Creation d'un Triangle Quelconque
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {Point} pointC 
     */
    constructor(pointA, pointB, pointC) {
        this.pointA = pointA;
        this.pointB = pointB;
        this.pointC = pointC;
        this.actualiserInfo_Tri();
        //------------------
        this.couleurContour_Tri_is_Afficher = true;
        this.couleur_Tri_is_Afficher = false;
        this.couleur_Tri = "white"
        this.couleurContour_Tri = "black"
        this.tailleDeLigne_tri = 1
        this.point_Tri_is_afficher = true
        //---------
    }
    /**
     * Obtenir les 3 Droite mediatrice de chaque coté de ce Triangle 
     * @returns [Droite,Droite,Droite]
     */
    get3DroitesMediatriatrice_tri() {
        var d1 = this.coteAB.getDroiteMediatriceSegment()
        var d2 = this.coteBC.getDroiteMediatriceSegment()
        var d3 = this.coteAC.getDroiteMediatriceSegment()
        return [d1, d2, d3]
    }
    /**
     * Obtenir le Point centre de ce Triangle . 
     * @returns Point
     */
    getPointCentreCirconscrit_tri() {
        var ldroit = this.get3DroitesMediatriatrice_tri()
        var pointCentre = ldroit[0].getPointIntersection_Droite_Droite(ldroit[1])
        return pointCentre;
    }
    /**
     * Obtenir le Cercle Circonscrit de ce triangle
     * @returns Cercle
     */
    getCercleCirconscrit_tri() {
        var pCentre = this.getPointCentreCirconscrit_tri()
        var c1 = new CercleDeRayon_longueurSegment(pCentre, this.pointA)
        return c1
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et un 'pointC'
     * @param {Point} pointC
     * @returns number
     */
    getDistance_CentreTriangle_Point(pointC) {
        var centreP = this.getPointCentre_Tri();
        return new Segment(centreP, pointC).longueur
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et un 'segmentC'
     * @param {Segment} segmentC
     * @returns number
     */
    getDistance_CentreTriangle_PointSegment(segmentC) {
        var centreP = this.getPointCentre_Tri();
        var d1 = new Droite(centreP, segmentC.pointA)
        var d2 = new Droite(centreP, segmentC.pointB)
        return (d1.longueur > d2.longueur) ? d2.longueur : d1.longueur;
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et un 'droiteC'
     * @param {Droite} droitC
     * @returns number
     */
    getDistance_CentreTriangle_Droite(droitC) {
        var centreP = this.getPointCentre_Tri();
        var p1 = droitC.getProjectionDunPoint(centreP)
        return new Droite(centreP, p1).longueur
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et le centre du  'cercleC'
     * @param {Cercle} cercleC
     * @returns number
     */
    getDistance_CentreTriangle_CentreCercle(cercleC) {
        var centreP = this.getPointCentre_Tri();
        var d1 = new Droite(centreP, cercleC.pointA)
        return d1.longueur
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et le'cercleC'
     * @param {Cercle} cercleC
     * @returns number
     */
    getDistance_CentreTriangle_Cercle(cercleC) {
        var centreP = this.getPointCentre_Tri();
        var d1 = new Droite(centreP, cercleC.pointA)
        d1.dessinerSegment()
        var lp = cercleC.get2PointIntersection_cercle_droite(d1)
        var p1 = (new Droite(centreP, lp[0]).longueur <= new Droite(centreP, lp[1]).longueur) ? lp[0] : lp[1]
        p1.dessinerPoint()
        var d2 = new Droite(p1, centreP)
        return d2.longueur
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et le centre de ce 'triangleC'
     * @param {Triangle} triangleC
     * @returns number
     */
    getDistance_CentreTriangle_CentreTriangle(triangleC) {
        var centreP = this.getPointCentre_Tri();
        var centreQ = triangleC.getPointCentre_Tri();
        var d1 = new Droite(centreP, centreQ)
        return d1.longueur
    }
    /**
     * Obtenir la distance entre le centre de ce triangle et le point lr plud proche de ce 'triangleC'
     * @param {Triangle} triangleC
     * @returns number
     */
    getDistance_CentreTriangle_PointTriangle(triangleC) {
        var centreP = this.getPointCentre_Tri();
        var d1 = new Droite(centreP, triangleC.pointA)
        var d2 = new Droite(centreP, triangleC.pointB)
        var d3 = new Droite(centreP, triangleC.pointC)
        var Dp = (d1.longueur < d2.longueur) ? d1 : d2
        Dp = (Dp.longueur < d3.longueur) ? Dp : d3
        Dp.dessinerSegment()
        return Dp.longueur
    }
    /**
     * Obtenir la distance entre un point le plus proche de ce Triangle par rapport au 'pointC'
     * @param {Point} pointC 
     * @returns Number
     */
    getDistance_PointTriangle_Point(pointC) {
        var d1 = new Droite(pointC, this.pointA)
        var d2 = new Droite(pointC, this.pointB)
        var d3 = new Droite(pointC, this.pointC)
        var Dp = (d1.longueur < d2.longueur) ? d1 : d2
        Dp = (Dp.longueur < d3.longueur) ? Dp : d3
        return Math.round(Dp.longueur * 100) / 100
    }
    /**
     * Obtenir la distance entre un point le plus proche de ce Triangle 
     * par rapport a un point le plus proche de ce 'segmentC'
     * @param {Segment} segmentC 
     * @returns Number
     */
    getDistance_PointTriangle_PointSegment(segmentC) {
        var d1 = this.getDistance_PointTriangle_Point(segmentC.pointA)
        var d2 = this.getDistance_PointTriangle_Point(segmentC.pointB)
        var d3 = (d1 < d2) ? d1 : d2
        return d3
    }
    /**
     * Obtenir la distance entre un point le plus proche de ce Triangle 
     * par rapport au  'droiteC'
     * @param {Droite} droiteC 
     * @returns Number
     */
    getDistance_PointTriangle_Droite(droiteC) {
        var p1 = droiteC.getProjectionDunPoint(this.pointA)
        var p2 = droiteC.getProjectionDunPoint(this.pointB)
        var p3 = droiteC.getProjectionDunPoint(this.pointC)
        var d1 = new Droite(p1, this.pointA)
        var d2 = new Droite(p2, this.pointB)
        var d3 = new Droite(p3, this.pointC)
        var dp = (d1.longueur < d2.longueur) ? d1 : d2;
        dp = (dp.longueur < d3.longueur) ? dp : d3;
        return dp.longueur
    }
    /**
     * Obtenir la distance entre un point le plus proche de ce Triangle 
     * par rapport au centre du 'cercleC'
     * @param {Cercle} cercleC 
     * @returns Number
     */
    getDistance_PointTriangle_CentreCercle(cercleC) {
        var pointCentre = cercleC.pointA
        return this.getDistance_PointTriangle_Point(pointCentre)
    }
    /**
     * Obtenir la distance entre un point le plus proche de ce Triangle 
     * par rapport au  'cercleC'
     * @param {Cercle} cercleC 
     * @returns Number
     */
    getDistance_PointTriangle_Cercle(cercleC) {
        var pointCentre = cercleC.pointA
        var d1 = new Droite(pointCentre, this.pointA)
        var d2 = new Droite(pointCentre, this.pointB)
        var d3 = new Droite(pointCentre, this.pointC)
        var Dp = (d1.longueur < d2.longueur) ? d1 : d2
        Dp = (Dp.longueur < d3.longueur) ? Dp : d3
        var lp = cercleC.get2PointIntersection_cercle_droite(Dp)
        var d5 = new Droite(lp[0], lp[1])
        var dist = this.getDistance_PointTriangle_PointSegment(d5)
        return Math.round(dist * 100) / 100
    }
    /**
     * Desiner le centre de ce Triangle
     */
    dessinerCentreTriangle() {
        var point = this.getPointCentre_Tri()
        point.dessinerPoint()
    }
    /**
     * Obtenir le point centre de ce triangle
     * @returns Point
     */
    getPointCentre_Tri() {
        var d1 = new Droite(this.pointA, this.pointMilieu_coteBC)
        var d2 = new Droite(this.pointB, this.pointMilieu_coteAC)
        return d1.getPointIntersection_Droite_Droite(d2)
    }
    /**
     * afficher ou pas le Couleur du Contour de ce Triangle
     * @param {Boolean} value 
     */
    afficherCouleurContourTriangle(value = true) {
        this.couleurContour_Tri_is_Afficher = Boolean(value);
    }
    /**
     * afficher ou pas le Couleur de ce Triangle
     * @param {Boolean} value 
     */
    afficherCouleurTriangle(value = true) {
        this.couleur_Tri_is_Afficher = Boolean(value);
    }
    /**
     * Changer la taille de ligne du Triangle 
     * @param {Number} valeur 
     */
    changerTailleDeLigne_tri(valeur = 2) {
        if (!isNaN(valeur)) {
            this.tailleDeLigne_tri = valeur
        }
    }
    /**
     * Changer la couleur du contour de ce triangle
     * @param {String} couleur 
     */
    changerColorContourTriangle(couleur = "white") {
        this.couleurContour_Tri = couleur;
    }
    /**
     * Changer la couleur de ce triangle
     * @param {String} couleur 
     */
    changerColorTriangle(couleur = "white") {
        this.couleur_Tri = couleur;
    }
    /**
     * Actualise l'information de ce triangle
     */
    actualiserInfo_Tri() {
        this.cercleAB = new CercleDeCentre_milieuSegment(this.pointA, this.pointB)
        this.cercleBC = new CercleDeCentre_milieuSegment(this.pointB, this.pointC)
        this.cercleAC = new CercleDeCentre_milieuSegment(this.pointA, this.pointC)
        //---------
        this.coteAB = this.cercleAB.segmentPere
        this.coteBC = this.cercleBC.segmentPere
        this.coteAC = this.cercleAC.segmentPere
        //---------
        this.pointMilieu_coteAB = this.coteAB.pointMilieu
        this.pointMilieu_coteBC = this.coteBC.pointMilieu
        this.pointMilieu_coteAC = this.coteAC.pointMilieu
        //---------
    }
    /**
     * Dessiner ce Triangle
     */
    dessinerTriangle() {
        crayon.beginPath()
        crayon.fillStyle = this.couleur_Tri
        crayon.strokeStyle = this.couleurContour_Tri
        crayon.lineWidth = this.tailleDeLigne_tri;
        crayon.moveTo(this.pointA.x, this.pointA.y)
        crayon.lineTo(this.pointB.x, this.pointB.y)
        crayon.lineTo(this.pointC.x, this.pointC.y)
        crayon.lineTo(this.pointA.x, this.pointA.y)
        if (this.couleurContour_Tri_is_Afficher) {
            crayon.stroke()
        }
        if (this.couleur_Tri_is_Afficher) {
            crayon.fill()
        }
        if (this.point_Tri_is_afficher) {
            this.pointA.dessinerPoint()
            this.pointB.dessinerPoint()
            this.pointC.dessinerPoint()
        }
    }
    /**
     * Dessiner les point milieu de chaque coté de ce triangle
     */
    dessinerPointMilieuCoter_Tri() {
        this.pointMilieu_coteAB.dessinerPoint()
        this.pointMilieu_coteBC.dessinerPoint()
        this.pointMilieu_coteAC.dessinerPoint()
    }
    dessinerFigure() {
        this.dessinerTriangle()
        this.dessinerCentreTriangle()
        this.dessinerPointMilieuCoter_Tri()
    }
    /**
     * Obtenir le Point d'intersection des bissectrices de ce triangle 
     * @returns Point
     */
    getPointMilieuBissectrice_tri() {
        var listeDroiteBis = this.get3DroitesBissectrice_Tri()
        var point = listeDroiteBis[0].getPointIntersection_Droite_Droite(listeDroiteBis[1])
        return point
    }
    /**
     * Obtenir le cercle inscrit a ce triangle
     * @returns Cercle
     */
    getCercleInscrit_Tri() {
        var pointA = this.getPointMilieuBissectrice_tri()
        var pointB = this.coteBC.getPointIntersection_Droite_Droite(this.getDroiteBissectrice_angleA())
        return new CercleDeRayon_longueurSegment(pointA, pointB);
    }
    /**
     * Obtenir la droite bissectrice a l'angle A de ce triangle
     * @returns Droite
     */
    getDroiteBissectrice_angleA() {
        var c1 = new Cercle(this.pointA, this.coteAB.longueur / 2)
        var lp = c1.get2PointIntersection_cercle_droite(this.coteAC)
        var condition = this.coteAC.verifiSiUnPoint_AppartientAceSegment(lp[0])
        var point0 = (condition) ? lp[0] : lp[1]

        var c2 = new CercleDeRayon_longueurSegment(this.pointMilieu_coteAB, point0)
        var c3 = new CercleDeRayon_longueurSegment(point0, this.pointMilieu_coteAB)
        var lp2 = c2.get2PointIntersection_cercle_cercle(c3)
        var droity = new Droite(lp2[0], lp2[1])
        return droity;
    }
    /**
     * Obtenir la droite bissectrice a l'angle B de ce triangle
     * @returns Droite
     */
    getDroiteBissectrice_angleB() {
        var c1 = new Cercle(this.pointB, this.coteAB.longueur / 2)
        var lp = c1.get2PointIntersection_cercle_droite(this.coteBC)
        var condition = this.coteBC.verifiSiUnPoint_AppartientAceSegment(lp[0])
        var point0 = (condition) ? lp[0] : lp[1]

        var c2 = new CercleDeRayon_longueurSegment(this.pointMilieu_coteAB, point0)
        var c3 = new CercleDeRayon_longueurSegment(point0, this.pointMilieu_coteAB)
        var lp2 = c2.get2PointIntersection_cercle_cercle(c3)
        var droity = new Droite(lp2[0], lp2[1])
        return droity;
    }
    /**
     * Obtenir la droite bissectrice a l'angle C de ce triangle
     * @returns Droite
     */
    getDroiteBissectrice_angleC() {
        var c1 = new Cercle(this.pointC, this.coteBC.longueur / 2)
        var lp = c1.get2PointIntersection_cercle_droite(this.coteAC)
        var condition = this.coteAC.verifiSiUnPoint_AppartientAceSegment(lp[0])
        var point0 = (condition) ? lp[0] : lp[1]

        var c2 = new CercleDeRayon_longueurSegment(this.pointMilieu_coteBC, point0)
        var c3 = new CercleDeRayon_longueurSegment(point0, this.pointMilieu_coteBC)
        var lp2 = c2.get2PointIntersection_cercle_cercle(c3)
        var droity = new Droite(lp2[0], lp2[1])
        return droity;
    }
    /**
     * Obtenir 3 droite bissectrice de ce triangle
     * @returns [Droite,Droite,Droite]
     */
    get3DroitesBissectrice_Tri() {
        var d1 = this.getDroiteBissectrice_angleA()
        var d2 = this.getDroiteBissectrice_angleB()
        var d3 = this.getDroiteBissectrice_angleC()
        return [d1, d2, d3]
    }
}
class TriangleRectangle extends Triangle {
    /**
     * Creation d'un Triangle Rectangle a partir du 'pointA'  
     * @param {Point} pointA 
     * @param {Number} LongH 
     * @param {Number} longV 
     */
    constructor(pointA, LongH, longV) {
        super(pointA, new Point("B_", pointA.x + LongH, pointA.y), new Point("C_", pointA.x, pointA.y + longV))
    }
}
class TriangleRectangleIsocele extends TriangleRectangle {
    /**
     * Creation d'un Triangle Rectangle Isocele a partir du 'pointA'
     * @param {Point} pointA 
     * @param {Number} long 
     */
    constructor(pointA, long) {
        super(pointA, long, long)
    }
}
class TriangleIsocele extends Triangle {
    /**
     * Creation d'un Triangle Isocele  a partir du 'pointA'
     * @param {Point} pointA 
     * @param {Number} long 
     * @param {Radian} angle 
     */
    constructor(pointA, long, angle = Math.PI / 2) {
        var x = pointA.x + long * Math.cos(angle)
        var y = pointA.y + long * Math.sin(angle)
        super(pointA, new Point(pointA.nom + 'b', pointA.x + long, pointA.y), new Point(pointA.nom + 'c', x, y))
    }
}
class TriangleEquilaterale extends TriangleIsocele {
    /**
     * reation d'un Triangle Equilaterale  a partir du 'pointA'
     * @param {Point} pointA 
     * @param {Number} long 
     */
    constructor(pointA, long) {
        super(pointA, long, Math.PI / 3)
    }
}
class Polygone {
    /**
     * Creation d'un polygone a partir du centre 'pointA' 
     * @param {Point} pointA 
     * @param {Number} nbrArrete 
     * @param {Number} rayon 
     */
    constructor(pointA, nbrArrete, rayon) {
        this.rayonPolygone = rayon;
        this.pointOrigine = pointA;
        this.nbrArrete = nbrArrete;
        this.pointCentrePolygone = pointA;
        this.listePointPlygone = []
        this.listeTrianglePolygone = [];
        this.listeArretePolygone = [];
        this.listeCerclePolygone = [];
        this.listeDiagonalePolygone = []
        this.angleDepartRotationPolygone = Math.PI / 4 * -3
        this.cercleInscritPolygone = undefined;
        this.cercleCirconscritPolygone = undefined;
        this.actualiseInfoPolygone()
    }
    /**
     * Pivoter ce polygone 
     * @param {Radian} angle 
     */
    tournerPolygone(angle) {
        this.angleDepartRotationPolygone += angle;
        this.actualiseInfoPolygone()
    }
    /**
     * Actualiser l'information de ce polygone
     */
    actualiseInfoPolygone() {
        var angle180 = this.angleDepartRotationPolygone;
        this.listeDiagonalePolygone = []
        this.listePointPlygone = []
        this.listeCerclePolygone = []
        this.listeTrianglePolygone = []
        this.listeArretePolygone = []
        for (var i = 0; i < this.nbrArrete; i++) {
            var x = this.pointOrigine.x + this.rayonPolygone * Math.cos(angle180)
            var y = this.pointOrigine.y + this.rayonPolygone * Math.sin(angle180)
            var point_a = new Point("a" + i, x, y)
            this.listeDiagonalePolygone.push(new CercleDeCentre_milieuSegment(this.pointOrigine, point_a))
            this.listePointPlygone.push(point_a)
            angle180 += Math.PI * 2 / this.nbrArrete
            if (i > 0 && this.nbrArrete >= 2) {
                this.listeCerclePolygone.push(new CercleDeCentre_milieuSegment(this.listePointPlygone[i - 1], this.listePointPlygone[i]))
                this.listeTrianglePolygone.push(new Triangle(this.pointOrigine, this.listePointPlygone[i - 1], this.listePointPlygone[i]))
            }
        }
        if (this.nbrArrete >= 2) {
            this.listeCerclePolygone.push(new CercleDeCentre_milieuSegment(this.listePointPlygone[this.nbrArrete - 1], this.listePointPlygone[0]))
            this.listeTrianglePolygone.push(new Triangle(this.pointOrigine, this.listePointPlygone[this.nbrArrete - 1], this.listePointPlygone[0]))
        } else {
            this.listeCerclePolygone.push(new CercleDeCentre_milieuSegment(this.pointCentrePolygone, this.listePointPlygone[0]))
        }
        this.listeCerclePolygone.forEach((arrr) => {
            this.listeArretePolygone.push(arrr.segmentPere)
        })
        if (this.nbrArrete == 2) {
            this.cercleInscritPolygone = new CercleDeRayon_moitierSegment(this.pointOrigine, this.listePointPlygone[0]);
            this.cercleCirconscritPolygone = new CercleDeRayon_longueurSegment(this.pointOrigine, this.listePointPlygone[0]);
        } else if (this.nbrArrete == 1) {
            this.cercleCirconscritPolygone = new CercleDeCentre_milieuSegment(this.pointOrigine, this.listePointPlygone[0]);
            this.cercleInscritPolygone = new Cercle(this.cercleCirconscritPolygone.segmentPere.pointMilieu, this.cercleCirconscritPolygone.longueur / 2);
        } else {
            this.cercleCirconscritPolygone = new CercleDeRayon_longueurSegment(this.pointOrigine, this.listePointPlygone[0]);
            this.cercleInscritPolygone = new CercleDeRayon_longueurSegment(this.pointOrigine, this.listeArretePolygone[0].pointMilieu);
        }
    }
    /***
     * Dessiner ce polygone
     */
    dessinerPolygone() {
        this.listeArretePolygone.forEach((arr) => {
            arr.dessinerSegment()
        })
    }
    /**
     * Dessiner les diagonale de ce polygone
     */
    dessinerDiagonalePolygone() {
        this.listeDiagonalePolygone.forEach((arr) => {
            arr.segmentPere.dessinerSegment()
        })
    }
    dessinerDroiteDiagonalePolygone() {
        this.listeDiagonalePolygone.forEach((arr) => {
            arr.segmentPere.dessinerDroite()
        })
    }
    /**
     * dessiner le centre de ce polygone
     */
    dessinerCentrePolygone() {
        this.pointOrigine.dessinerPoint()
    }
    dessinerFigure() {
        this.dessinerPolygone()
        this.dessinerDiagonalePolygone()
        this.dessinerDroiteDiagonalePolygone()
    }
}
class Quadrilatere {
    /**
     * Creation d'un  Quadrilatere a partir de 4 point differente
     * @param {Point} pointA 
     * @param {Point} pointB 
     * @param {Point} pointC 
     * @param {Point} pointD 
     */
    constructor(pointA, pointB, pointC, pointD) {
        this.pointA = pointA
        this.pointB = pointB
        this.pointC = pointC
        this.pointD = pointD
        //console.log(pointA,pointB,pointC,pointD);
        //--------------------
        this.listePoint_Q4 = []
        this.listeArrete_Q4 = []
        this.listeDiagonale = []
        this.pointCentre_Q4 = undefined;
        this.angleDeRotation_Q4 = Math.PI
        //--------------------
        this.actualiseInfo_Q4()
        //--------------------
    }
    deplacer_Q4(xA,yA,xB,yB,xC,yC,xD,yD){
        this.pointA.deplacer(xA,yA)
        this.pointB.deplacer(xB,yB)
        this.pointC.deplacer(xC,yC)
        this.pointD.deplacer(xD,yD)
        this.actualiseInfo_Q4()
    }
    pousser_Q4(x,y){
        console.log(x,y);
        if( !isNaN(x) && !isNaN(y)){
            console.log("tafa");
            this.listePoint_Q4.forEach((point)=>{
                point.pousserPoint(x,y)
            })
        }
    }
    /**
     * Actualiser l'information de de ce Quadrilatere
     */
    actualiseInfo_Q4() {
        this.listePoint_Q4 = [this.pointA, this.pointB, this.pointC, this.pointD]
        this.listeArrete_Q4 = [
            new S_D_C(this.pointA, this.pointB),
            new S_D_C(this.pointB, this.pointC),
            new S_D_C(this.pointC, this.pointD),
            new S_D_C(this.pointD, this.pointA)
        ]
        this.listeDiagonale = [
            new S_D_C(this.pointA, this.pointC),
            new S_D_C(this.pointB, this.pointD)
        ]
        this.pointCentre_Q4 = this.listeDiagonale[0].segmentPere.getPointIntersection_Droite_Droite(this.listeDiagonale[1].segmentPere)
    }
    dessinerFigure() {
        this.dessiner_Q4()
        this.dessinerCentre_Q4()
    }
    /**
     * Dessiner ce Quadrilatere
     */
    dessiner_Q4() {
        this.listeArrete_Q4.forEach(function (arrete) {
            //console.log(arrete.pointA.x,arrete.pointA.y);
            arrete.dessinerSegment()
        })
    }
    /**
     * DEssiner le centre de ce Quadrilatere
     */
    dessinerCentre_Q4() {
        this.pointCentre_Q4.dessinerPoint()
    }
    /**
     * Pivoter ce Quadrilatere ** Bug ****
     * @param {Radian} angle 
     */
    tourner_Q4(angle) {
        this.angleDeRotation_Q4 += angle
        this.listePoint_Q4.forEach((point) => {
            var long = new Droite(point, this.pointCentre_Q4).longueur
            var anglePx = Math.acos((point.x - this.pointCentre_Q4.x) / long)
            var anglePy = Math.asin((point.y - this.pointCentre_Q4.y) / long)
            console.log(anglePx, anglePy);
            var x = this.pointCentre_Q4.x + long * Math.cos(this.angleDeRotation_Q4)
            var y = this.pointCentre_Q4.y + long * Math.sin(this.angleDeRotation_Q4)
            point.x = x
            point.y = y
            this.angleDeRotation_Q4 += Math.PI * 2 / 4
        })
        //this.actualiseInfo_Q4()
    }
}
class Rectangle extends Quadrilatere {
    /**
     * Creation d'un Rectangle a partir du 'pointA'
     * @param {Point} pointA 
     * @param {Number} LongH 
     * @param {Number} longV 
     */
    constructor(pointA, LongH, longV) {
        super(pointA,
            new Point(pointA.nom + "b", pointA.x + LongH, pointA.y),
            new Point(pointA.nom + "c", pointA.x + LongH, pointA.y + longV),
            new Point(pointA.nom + "d", pointA.x, pointA.y + longV),
        )
        this.longH=LongH;
        this.longV=longV;
    }
    deplacer_Q4(x,y){
        if( !isNaN(x) && !isNaN(y)){
            var xA=x;
            var yA=y;
            var xB=x+this.longH;
            var yB=y;
            var xC=x+this.longH
            var yC=y+this.longV
            var xD=x;
            var yD=y+this.longV
            //console.log(xA,yA,xB,yB,xC,yC,xD,yD);
            super.deplacer_Q4(xA,yA,xB,yB,xC,yC,xD,yD)
        }
        this.actualiseInfo_Q4()
    }
    // tourner_Q4(angle) {
    //     this.angleDeRotation_Q4 += angle
    //     this.listePoint_Q4.forEach((point) => {
    //         var long = new Droite(point, this.pointCentre_Q4).longueur
    //         var x = this.pointCentre_Q4.x + long * Math.cos(this.angleDeRotation_Q4)
    //         var y = this.pointCentre_Q4.y + long * Math.sin(this.angleDeRotation_Q4)
    //         point.x = x // point.x + long * Math.cos(angle)
    //         point.y = y //point.y + long * Math.sin(angle)
    //         this.angleDeRotation_Q4 += (point.nom == this.pointA.nom || point.nom == this.pointC.nom) ? Math.PI * 2 / 4 : Math.PI * 2 / 4
    //     })
    //     //this.actualiseInfo_Q4()
    // }
}
class Carrer extends Rectangle {
    /**
     * Creation d'un Carrer a partir du 'pointA'
     * @param {Point} pointA 
     * @param {Number} long 
     */
    constructor(pointA, long) {
        super(pointA, long, long)
    }
}
//-----------------------------------------
class PointService {
    constructor() {
        this.liste_Point = [];
        this.selected_point = undefined;
    }
    /**
     * Selectionner un Point dans la liste de point par son index
     * @param {Number} indexP 
     * @returns Point
     */
    selectionnerUnPoint(indexP = this.liste_Point.length - 1) {
        if (this.liste_Point) {
            indexP = (indexP < 0) ? 0 : indexP
            indexP = (indexP >= this.liste_Point.length) ? this.liste_Point.length - 1 : indexP
            this.selected_point = this.liste_Point[indexP]
            return this.selected_point
        }
    }
    /**
     * Obtenir l'index du point selectionné
     */
    get indexPointSelected() {
        return this.liste_Point.indexOf(this.selected_point)
    }
    /**
     * Ajouter un point dans la liste de point de selectionner ce dernier
     * @param {Point} pointC 
     */
    ajouter_point(pointC) {
        this.liste_Point.push(pointC)
        this.selectionnerUnPoint()
    }
    /**
     * Créer un nouveau point de coordonée x ,y 
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} nom 
     * @returns Point
     */
    creer_point(x, y, nom) {
        var p = new Point(nom, x, y)
        return p;
    }
    /**
     * Effacer de la liste un point a l'index specifier si aucun index est specifier alors 
     * le point selectionné sera effacer . le nouveau point selectionné sera a l'index-1 si la liste ne sera pas encore
     *  vide apres l'effacement . si la valeur de l'index est inferieur a zero alors le point dans lindex zero sera effacer , si la valeur 
     *  index est superieur ou egale au nombre de point dans la liste , alors le dernier point sera effacer de la liste   
     * @param {Number} index 
     * @returns Point
     */
    effacer_point(index = this.indexPointSelected) {
        if (this.liste_Point) {
            index = (index < 0) ? 0 : index;
            index = (index >= this.liste_Point.length) ? this.liste_Point.length - 1 : index;
            var p = this.liste_Point.slice(index, 1)
            return p
        }
    }
    /**
     * modifier l'attribu du point  selectionné . 
     * si vous vouler pas modifier un attribu mettez son valeur par undefined .
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} nom 
     * @param {String} couleur 
     */
    editer_point_selectionner(x = undefined, y = undefined, nom = undefined, couleur = undefined) {
        if (!isNaN(x)) {
            this.selected_point.x = x
        }
        if (!isNaN(y)) {
            this.selected_point.y = y
        }
        if (nom) {
            this.selected_point.nom = String(nom)
        }
        if (couleur) {
            this.selected_point.color = couleur;
        }
    }
    /**
     * poussé le point selectionné par valeur ( x, y)
     * @param {Number} x 
     * @param {Number} y 
     */
    pousser_point(x = 0, y = 0) {
        if (!isNaN(x)) {
            this.selected_point.x += x
        }
        if (!isNaN(y)) {
            this.selected_point.y += y
        }
    }
    /**
     * Obtenir un point dans la liste par son index
     * @param {Number} index 
     */
    pointInIndex(index) {
        if (this.liste_Point && !isNaN(index) && index < this.liste_Point.length && index > 0) {
            return this.liste_Point[index]
        }
    }
    /**
     * Obtenir un S_D_L a partir de 2 point dans la liste 
     * @param {Number} index0 
     * @param {Number} index1 
     * @returns S_D_L
     */
    get_SDC_by2IndexPoint(index0, index1) {
        var p0 = this.pointInIndex(index0)
        var p1 = this.pointInIndex(index1)
        return new S_D_C(p0, p1)
    }
    /**
     * Obtenir le nombre de point dans la liste
     * @returns Number
     */
    get len_point() {
        return this.liste_Point.length
    }
    /**
     * Obtenir tous les S_D_L de la liste
     * @returns [S_D_L,...]
     */
    getAll_SDC() {
        var liste1 = []
        if (this.liste_Point > 1) {
            this.liste_Point.forEach(function (point, index) {
                if (index > 1) {
                    liste1.push(this.get_SDC_by2IndexPoint(index - 1, index))
                } else {
                    liste1.push(this.get_SDC_by2IndexPoint(0, this.len_point - 1))
                }
            }, this)
        }
        return liste1
    }
    /**
     * Dessiner tous les points dans la liste qui ont comme attribu .canDrawing=true
     */
    dessinerAllPoint() {
        this.liste_Point.forEach((point) => {
            if (point.canDrawing) {
                point.dessinerPoint()
            }
        })
    }
    dessiner_point_selected(){
        this.selected_point.dessinerFigure()
    }
}
class FigureService{
    constructor(){
        this.liste_figure = []; // triangle , Cercle , Polygone , Quadrilatere 
        this.selected_figure = undefined;
    }
    deplacer(x,y){
        this.selected_figure.deplacer_Q4(x,y)
    }
    pousser(x,y){
        this.selected_figure.pousser_Q4(x,y)
    }
    selectionnerUnFigure(index=this.liste_figure.length-1){
        if(!isNaN(index)){
            this.selected_figure=this.liste_figure[index];
            return this.selected_figure;
        }
    }
    get index_figure_selected(){
        return this.liste_figure.indexOf(this.selected_figure);
    }
    get len_liste_figure(){
        return this.liste_figure.length
    }
    dessinerFigure(index=this.index_figure_selected){
        if(!isNaN(index) && index<this.len_liste_figure && index>0){
            this.liste_figure[index].dessinerFigure()
        }
    }
    creer_triangle(pointA,pointB,pointC){
        var triangle=new Triangle(pointA,pointB,pointC)
        this.liste_figure.push(triangle);
        this.selectionnerUnFigure()
        return triangle
    }
    creer_rectangle(pointA,longH,longV){
        var rect=new Rectangle(pointA,longH,longV)
        this.liste_figure.push(rect)
        this.selectionnerUnFigure()
        return rect;
    }
}
class SDCService {}
class FigureGeomtrie {
    constructor() {
        //-----------------
        this.adminPoint = new PointService();
        this.adminSDC = new SDCService();
        this.adminFigure= new FigureService();
        //-------------------
    }
    deplacer_figure_selected(x,y){
        this.adminFigure.deplacer(x,y)
    }
    pousser_figure_selected(x,y){
        this.adminFigure.pousser(x,y)
    }
    get selected_point(){
        return this.adminPoint.selected_point
    }
    creer_rectangle(pointA=this.adminPoint.selected_point,longH,longV){
        var rect=this.adminFigure.creer_rectangle(pointA,longH,longV)
        var pointb=this.adminFigure.selected_figure.pointB
        var pointc=this.adminFigure.selected_figure.pointC
        var pointd=this.adminFigure.selected_figure.pointD
        return rect;
    }
    //----------------------------------------------------------
    /**
     * Creer un point de coordonnée(x,y)
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} nom 
     * @returns Point
     */
    creer_point(x, y, nom = "a") {
        var point = this.adminPoint.creer_point(x, y, nom);
        return point;
    }
    /**
     * Enregistrer un point dans la liste d'adminPoint
     * @param {Point} point 
     * @returns Number
     */
    enregistrer_point(point) {
        this.adminPoint.ajouter_point(point)
        return this.adminPoint.len_point
    }
    /**
     * Selectionner un point dans la liste par son index
     * . si l'index  n'est pas specifié dans le parametre , alors le dernier point dans la liste sera selectioné 
     * @param {Number} index 
     * @returns Point
     */
    selectionner_point(index = this.adminPoint.len_point - 1) {
        var point = this.adminPoint.selectionnerUnPoint(index);
        return point
    }
    /**
     * Dessiner Tous les point dans la liste 
     * @param {Boolean} sansException 
     */
    dessiner_les_point(sansException=false){
        if(sansException){
            this.adminPoint.liste_Point.forEach((point)=>{
                point.dessinerPoint()
            })
        }else{
            this.adminPoint.dessinerAllPoint()
        }
    }
    dessiner_point_selected(){
        this.adminPoint.dessiner_point_selected()
    }
    creer_et_enregistrer_point(x, y, nom = "a"){
        var p=this.creer_point(x,y,nom)
        this.enregistrer_point(p)
    }
    dessinerFigure(index=this.adminFigure.index_figure_selected){
        var cond1=(!isNaN(index))
        if(cond1 && (index>=0) && ( index < this.adminFigure.len_liste_figure)){
            this.adminFigure.liste_figure[index].dessinerFigure()
        }
    }
    //-------------------------------------------------------------
}
//---------------------
//------DEMO
// Enlever le commentaire pour faire faire fonctionner le demo
// f1 = new FigureGeomtrie()
// souris = new Souris(canvas)
// Pio=new Point("P",250,200)
// poli_p=new Polygone(Pio,3,100)
// iii=0
// xx=1
// sensX=1
// yy=2
// sensY=1
function demo() {
    if(true){
        iii+=0.1
        if(Pio.x+xx+poli_p.rayonPolygone>canvas.width){
            sensX=-1
        }else if(Pio.x+xx-poli_p.rayonPolygone<0){
            sensX=1
        }
        if(Pio.y+yy+poli_p.rayonPolygone>canvas.height){
            sensY=-1
        }else if(Pio.y+yy-poli_p.rayonPolygone<0){
            sensY=1
        }
        Pio.pousserPoint(xx*sensX,yy*sensY)
        //Pio.deplacer(souris.mouseX,souris.mouseY)
        crayon.clearRect(0,0,500,500)
        var p = f1.creer_point(souris.mouseX, souris.mouseY, "a")
        p.afficherPosition(true)
        p.afficherNom(false)
        p.changerTaillePoint(5)
        if (souris.isclicked) {
            p.dessinerPoint()
        }
        poli_p.listePointPlygone.forEach((point)=>{
            var l=new Polygone(point,5,25)
            l.tournerPolygone(iii)
            l.listePointPlygone.forEach((po)=>{
                po.afficherNom(false)
            })
            l.dessinerPolygone()
        })
        poli_p.dessinerCentrePolygone()
        poli_p.tournerPolygone(0.02)
        poli_p.dessinerPolygone()
        poli_p.cercleCirconscritPolygone.dessinerArc()
        poli_p.cercleInscritPolygone.dessinerArc()
    }
}
function lancerDemo(){
    demo()
    requestAnimationFrame(lancerDemo)
}
//-----------------------FIN DEMO