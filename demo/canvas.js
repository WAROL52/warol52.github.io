monSouris=new Souris(canvas)
listeCouleur=["red","yellow","bleu","green","white","black","orange"]
class Player{
    constructor(){
        this.max_x=0;
        this.max_y=0;
        this.largeur=50;
        this.taille=100;
        this.valeur_de_deplacement=2000;
        this.init()
        this.figure=new FigureGeomtrie()
        this.figure.creer_et_enregistrer_point(50,this.max_y-this.taille,"a")
        //this.figure.dessiner_point_selected()
        this.figure.creer_rectangle(this.figure.selected_point,this.largeur,this.taille)
        this.pA=this.figure.selected_point
        this.pB=this.figure.adminFigure.selected_figure.pointB
    }
    init(){
        this.max_x=canvas.width
        this.max_y=canvas.height
    }
    deplacer_vers_gauche(){
        if(this.pA.x-this.valeur_de_deplacement>=0){
            this.figure.pousser_figure_selected(-this.valeur_de_deplacement,0)
        }else{
            this.figure.pousser_figure_selected(-this.pA.x,0)
        }
    }
    deplacer_vers_droite(){
        if(this.pB.x+this.valeur_de_deplacement<=this.max_x){
            this.figure.pousser_figure_selected(-this.valeur_de_deplacement,0)
        }else{
            this.figure.pousser_figure_selected(this.max_x-this.pB.x,0)
        }
    }
    deplacer_avec_souris(){
        monSouris.event_mousemove((ev)=>{
            
            if(ev.which!=3){
                this.figure.deplacer_figure_selected(monSouris.mouseX-this.largeur/2,this.max_y-this.taille)
                armeDeBob.trajectoire.segmentPere.pointA.x=this.figure.adminFigure.selected_figure.pointCentre_Q4.x
            }
            
            
        })
    }
}
class MonsterBulle{
    constructor(x,y){
        this.type="classique"
        this.point=new Point(this.type,x,y)
        this.taille=Math.random()* (50 - 15) +15
        this.cercle=new Cercle(this.point,this.taille)
        this.cercle.changerColorArc(listeCouleur[Math.floor(Math.random()*listeCouleur.length)])
        this.cercle.afficherCouleurCercle()
        this.incrementation=0.9-this.taille*0.01
    }
    dessinerMonster(){
        this.cercle.dessinerArc()
    }
    updateMonsterBulle(){
        this.cercle.pousser(0,this.incrementation)
        this.dessinerMonster()
    }
} 
class Arme{
    constructor(){
        var point=Bob.figure.adminFigure.selected_figure.pointCentre_Q4
        this.trajectoire=new S_D_C(point,new Point("C",Bob.pA.x,-10))
    }
    dessiner_trajectoir_bale(){
        this.trajectoire.dessinerSegment()
    }
}
listeMonsterBulle=[new MonsterBulle(50,50)]
Bob=new Player()
Bob.deplacer_avec_souris()
armeDeBob=new Arme()


function updateMonster(){
    if(compteur%Math.floor(Math.random()*(300-100)+100)==0){
        console.log(compteur);
        if(listeMonsterBulle.length<10){
            var xRand=Math.random()*canvas.width
            listeMonsterBulle.push(new MonsterBulle(xRand,0))
        }
    }
    listeMonsterBulle.forEach( (element,index,liste) => {
        var distance=new Segment(element.point,new Point("s",monSouris.mouseX,monSouris.mouseY)).longueur
        if(distance<element.taille){
            liste.splice(index,1)
        }else if(element.point.y+element.taille>=canvas.height){
            liste.splice(index,1)
        }else{
            element.updateMonsterBulle()
        }
    });
}

function updatePlayer(){
    Bob.figure.dessinerFigure()
    armeDeBob.dessiner_trajectoir_bale()
}
function updateBale(){
    armeDeBob.trajectoire.segmentPere.pointB.x=monSouris.mouseX
    armeDeBob.trajectoire.segmentPere.pointB.y=monSouris.mouseY
}

compteur=0
monSouris.event_click(()=>{
    listeMonsterBulle.forEach((bull,i,li)=>{
        
    })
})
function anime(){
    crayon.clearRect(0,0,canvas.width,canvas.height)
    //crayon.fillRect(0,0,500,500)
    updateMonster()
    updatePlayer()
    updateBale()
    //-------------------
    var c=new Cercle(new Point('0',monSouris.mouseX,monSouris.mouseY),10)
    //------------------
    
    c.dessinerArc()
    compteur+=1
    requestAnimationFrame(anime)
}
anime()
console.log(crayon);