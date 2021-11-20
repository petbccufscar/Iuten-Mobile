export default class Iuten {
    

    restart(){
        this.table = []

        this.s = '2p1d1p1_1p1d2p1a1_1e1p1c1p1e1_1aF_F_F_F_3_1A1_1E1P1C1P1E1_1A2P1D1P1_1P1D2P'

        this.TORRE1 = [5,5]
        this.TORRE2 = [5,9]
        this.TRONO1 = [5,2]
        this.TRONO2 = [5,12]
        this.ELEFANTES1 = 0
        this.ELEFANTES2 = 0
        this.CURPLAYER = 1
        this.SPECIALROUND = false
        this.finished = false
        // TODO VOLTAR AQUI
        this.types = {}
        this.types['s'] = 1
        this.types['m'] = 0
        this.table = this.codToTable(this.s)
    }
    //  TIME 0 = minusculas
    //  TIME 1 = maiusculas
    constructor(){
        this.restart()
    }
    toHex(n){
        if (n > 9) return String.fromCharCode(n + 55)
        else return n.toString()
    }

    toDec(n){
        n = '0x'+n
        return parseInt(n,16)
    }

    tableToCod(t){
        // ultima posicao de no-op
        let op = 23
        let idx = 0
        let result = ''
        let lastc = t[op]
        let pos = op
        let linha = 0
        for (let i = 0; i < 11; i++){
            for (let j = 0; j < 9; j++){
                if (t[linha][pos] == lastc && idx < 15){
                    idx += 1
                }
                else{
                    result += this.toHex(idx)+lastc
                    idx = 1
                    lastc = t[linha][pos]
                }
                pos += 1
            }
            pos = 0
            linha += 1
        }
        return result + this.toHex(idx)+lastc
    }
    
    codToTable(t){
        let m = []
        
        let l = 'n'.repeat(11).split("")
        m.push(l)
        l = 'n'.repeat(11).split("")
        m.push(l)
        l = ['n']
        let idx = 0
        for(let i = 0; i < t.length/2; i++){
            let n = this.toDec(t[2*i])
            let c = t[2*i + 1]
            while (n != 0) {
                let aux = Math.min(9 - idx, n)
                l.push(...(c.repeat(aux)))
                idx += aux
                n -= aux
                if (idx == 9){
                    idx = 0
                    l.push(...'n')
                    m.push(l)
                    l = ['n']
                }
            }
        }
        l.push(...('n'.repeat(10)))
        m.push(l)
        l = []
        l.push(...('n'.repeat(11)))
        m.push(l)
        return m
    }
    printTable(t, n = false){
        for (let i = 0; i < t.length; i++){

            let result  = t[i].toString()
            if (n){
                
                result.replace(/n/g,'')
            }
            console.log(result)
        }
    }
    isalpha(ch){
        return /^[A-Z]$/i.test(ch);
    }
    isupper(myString) { 
        return (myString == myString.toUpperCase()); 
      } 
    islower(myString) { 
        return (myString == myString.toLowerCase()); 
    } 
    ocupavel(p, team){

        let cur = this.table[p[1]][p[0]]

        if (cur == 'n') return false
        if (cur == '_') return true
        if (team == 0 && this.isalpha(cur) && this.isupper(cur))
            return true
        if (team == 1 && this.isalpha(cur) && this.islower(cur))
            return true
        return false
    }
    // posicao, direcao, tamanho do feixe, time
    raioLaser(p, dir, tam, team, shot = false){
        let incx = 1
        let incy = 1
        let count = 0
        let moves = []
        let curx = p[0]
        let cury = p[1]
        
        switch (dir) {
            // vertical cima
            case 1:
                incx = 0
                incy = -1
                break
            // vertical baixo
            case 2:
                incx = 0
                incy = 1
                break
            // horizontal esquerda
            case 3:
                incx = -1
                incy = 0
                break
            // horizontal direira
            case 4:
                incx = 1
                incy = 0
                break
            // diagonal cimaesquerda -> baixodireita
            case 5:
                incx = 1
                incy = 1
                break
            // diagonal cimaedireita -> baixoesquerda
            case 6:
                incx = -1
                incy = 1
                break
            // diagonal baixodireita -> cimaesquerda
            case 7:
                incx = -1
                incy = -1
                break
            // diagonal baixoesquerda -> cimaedireita
            case 8:
                incx = 1
                incy = -1
                break
        }
        while (1){
            curx += incx
            cury += incy
            let possivel = this.ocupavel([curx, cury],team)
            let curPos = this.table[cury][curx]
            
            if (! possivel || count >= tam){
                if (moves.length > 0 && shot){
                    if (curPos != 'n' && (this.isupper(curPos) && team == 0 ||
                        this.islower(curPos) && team == 1))
                        moves = [moves[moves.length - 1]]
                    else
                        moves = []
                }
                break
            }
            else if (possivel && (curPos != '_' || this.includes([this.TORRE2,this.TORRE1],[curx, cury]))){
                moves.push([curx, cury])
                if (shot){
                    moves = [moves[moves.length - 1]]
                   
                }
                break

            }
            count += 1
            moves.push([curx, cury])
        }

        return moves
    }
    adjacente(p, team){
        let moves = []
        moves.push(...this.raioLaser(p,1,1,team))
        moves.push(...this.raioLaser(p,2,1,team))
        moves.push(...this.raioLaser(p,3,1,team))
        moves.push(...this.raioLaser(p,4,1,team))
        moves.push(...this.raioLaser(p,5,1,team))
        moves.push(...this.raioLaser(p,6,1,team))
        moves.push(...this.raioLaser(p,7,1,team))
        moves.push(...this.raioLaser(p,8,1,team))
        return moves
    }
    peao(p, team){
        return [this.adjacente(p, team), []]
    }
    druida(p, team){
        let moves = []
        moves.push(...this.raioLaser(p, 1, 2, team))
        moves.push(...this.raioLaser(p, 2, 2, team))
        moves.push(...this.raioLaser(p, 3, 2, team))
        moves.push(...this.raioLaser(p, 4, 2, team))

        let ele = []
        if (team == 0 && this.ELEFANTES1 > 0 || team == 1 && this.ELEFANTES2 > 0)
            ele =  this.adjacente(p, team)

        return [moves, ele]
    }

    arqueiro(p, team){
        let moves = []
        if (this.includes([this.TORRE1,this.TORRE2],p)){
            moves.push(...this.raioLaser(p,5,10,team,true))
            moves.push(...this.raioLaser(p,6,10,team,true))
            moves.push(...this.raioLaser(p,7,10,team,true))
            moves.push(...this.raioLaser(p,8,10,team,true))
            return [this.adjacente(p, team), moves]
        }
        else {
            moves.push(...this.raioLaser(p,5,2,team))
            moves.push(...this.raioLaser(p,6,2,team))
            moves.push(...this.raioLaser(p,7,2,team))
            moves.push(...this.raioLaser(p,8,2,team))
            moves.push(...this.raioLaser(p,3,1,team))
            moves.push(...this.raioLaser(p,4,1,team))
        }

        return [moves, []]
    }
    elefante(p, team){
        let moves = []
        if (team == 0){
            moves.push(...this.raioLaser(p, 2, 1, team))
            moves.push(...this.raioLaser(p, 5, 1, team))
            moves.push(...this.raioLaser(p, 6, 1, team))
        }
        if (team == 1){
            moves.push(...this.raioLaser(p, 1, 1, team))
            moves.push(...this.raioLaser(p, 7, 1, team))
            moves.push(...this.raioLaser(p, 8, 1, team))
        }
        return [moves, []]
    }
    
    cavaleiro(p, team, bonus = false){
        let moves = []
        if (bonus)
            return [this.adjacente(p, team), []]
        moves.push(...this.raioLaser(p, 1, 10, team))
        moves.push(...this.raioLaser(p, 2, 10, team))
        moves.push(...this.raioLaser(p, 3, 8, team))
        moves.push(...this.raioLaser(p, 4, 8, team))
        return [moves, []]
    }
    equals(a, b){
        return JSON.stringify(a) === JSON.stringify(b);
    }
    includes(l, e){
        for (let i = 0; i < l.length; i++){
            if(this.equals(e, l[i])) return true
        }
        // console.log(e, ' nao esta em ', l)
        return false
    }


    // Quais são os tipos de movimentos?  (nomrais :{mover, capturar},
    // especiais: {atirar, invocar})

    // As posicoes são (x,y) com base no plano cartesiano, logo pra acessar a
    // posicao deve-se fazer table[y][x]
    isMy(p, team, f = (e) => true){
        const peca = this.table[p[1]][p[0]]
        const a = (team == 0 && this.islower(peca) && this.isalpha(peca) && peca != 'n')
        const b = (team == 1 && this.isupper(peca) && this.isalpha(peca))
        return f(peca) && (a || b)
    }

    checkEnemyMoves(p, team){
        return this.checkMoves(p, Math.abs(team - 1) ,false);
    }
    checkMoves(p, team, verify = true){
        if (team != this.CURPLAYER && verify || team > 1){
            // console.log(`Não é o seu turno ${this.CURPLAYER} ${team}`)
            return [[],[]]
        }

        if (this.finished){
            // console.log('O JOGO ACABOU')
            return 
        }
        
        let peca = this.table[p[1]][p[0]]
        if (peca == '_'){
            // console.log('é um espaco vazio')
            return [[], []]
        }

        if (!this.isMy(p, team)){
            // console.log('Não é sua peca')
            return [[], []]
        }

        peca = peca.toLowerCase()

        if (this.isMy(this.TORRE1, team, e => (e.toLowerCase() != 'a'))){
            if (!this.equals(p, this.TORRE1))
                return [[], []]
            else
                return [this.adjacente(p, team),[]]
        }
        if (this.isMy(this.TORRE2, team, (e) => (e.toLowerCase() != 'a'))){
            if (!this.equals(p, this.TORRE2))
                return [[], []]
            else
                return [this.adjacente(p, team),[]]
        }
        if (this.SPECIALROUND)
            if (peca != 'c')
                return [[],[]]
            else 
                return this.cavaleiro(p, team, true)
        switch (peca){
            case'p':
                return this.peao(p, team)
            case 'e':
                return this.elefante(p, team)
            case 'd':
                return this.druida(p, team)
            case 'c':
                return this.cavaleiro(p, team)
            case 'a':
                return this.arqueiro(p, team)
            default:
                return [[],[]]
        }
    }
    sum = (array) => array.reduce(function(pv, cv) { return pv + cv; }, 0);
    gameover(){
        this.finished = true
        if (this.table[this.TRONO1[1]][this.TRONO1[0]] == 'P'){
            console.log('P chegou no trono')
            return 2
        }
        else if (this.table[this.TRONO2[1]][this.TRONO2[0]] == 'p'){
            console.log('p chegou no trono')
            return 1
        }

        else {
            let countp = 0
            let countP = 0
            for (let i = 0; i < this.table.length; i++){
                for (let j = 0; j < this.table[i].length; j++){
                    if (this.table[i][j] == 'p'){
                        countp += 1
                    } 
                    else if (this.table[i][j] == 'P'){ 
                        countP += 1
                    }
                }
            }   
            if (countp == 0){
                console.log('todos p morreram')
                return 2
            } else if(countP == 0){
                console.log('todos P morreram')
                return 1
            }
            
        }
        


        this.finished = false
        return 0
    }
    move(p, np, team, type){
        let next = this.CURPLAYER == 1 ? 0: 1
        if (team != this.CURPLAYER)
            // console.log('Não é o seu turno')
            return
        if (this.finished){
            console.log('O JOGO ACABOU')
            return
        }

        let possible = this.checkMoves(p, team)

        if (this.includes(possible[this.types[type]],np)){
            let oldPiece = this.table[np[1]][np[0]]
            let piece = this.table[p[1]][p[0]]
            let newpos = [np[0], np[1]]
            
            
            
            if (piece.toLowerCase() == 'd' && this.types[type] == 1){
                // Invoca elefante
                if (team == 0){
                    this.ELEFANTES1 -= 1
                    this.table[np[1]][np[0]] = 'e' 
                }
                else {
                    this.ELEFANTES2 -= 1
                    this.table[np[1]][np[0]] = 'E' 
                }
            }
            else if (piece.toLowerCase() == 'a' && this.types[type] == 1){
                // Atira
                this.table[np[1]][np[0]] = '_'
            }
            else {
                // movimento default
                this.table[np[1]][np[0]] = this.table[p[1]][p[0]]
                this.table[p[1]][p[0]] = '_'


            }
            let diff = Math.abs(np[1] - p[1]) + Math.abs(np[0] - p[0])
            // Checagem se o jogo acabou
            if (oldPiece.toLowerCase() == 'p' || piece.toLowerCase() == 'p')
                this.gameover()
            if (oldPiece.toLowerCase() == 'e'){
                if (this.isupper(oldPiece))
                    this.ELEFANTES1 += 1
                else
                    this.ELEFANTES2 += 1
            }
            // Caso especial do cavaleiro
            if (piece.toLowerCase() == 'c' && this.SPECIALROUND)
                this.SPECIALROUND = false
            else if (piece.toLowerCase() == 'c' && ! this.SPECIALROUND && oldPiece != '_' && diff >= 3 && ! ( this.includes([this.TORRE1, this.TORRE2],newpos))){
                this.SPECIALROUND = true
                next = this.CURPLAYER
            }
            this.CURPLAYER = next
        }
        else{
            console.log(`algo deu errado... \n:`)
            console.log(np)
            console.log(possible[this.types[type]])
        }
    }

    // TODO implementar
    process(comando){}

    rand(b){
        // TODO verificar isso
        return 1 == b ? 0 : Math.floor(Math.random() * (b))
    }
    getTable(){
        return this.table
    }
    values(e){
        const peca = (this.table[e[1]][e[0]]).toLowerCase()
        const valores = ['c','p','d','a','e','_']
        if (valores.includes(peca))
            return valores.indexOf(peca)
        else
            return 10 
    }
    bogoSillyIneffectiveChoice(team, teste=false){
        let moves = []
        let special = []
        let escolhido = null
        let escolhas = []
        let esperto = false
        let trono = team == 1 ? this.TRONO1 : this.TRONO2
        for (let i = 1; i < 10; i++){
            for (let j = 2; j < 13; j++){
                let aux = this.checkMoves([i, j], team)
                if (aux != null){
                    if (aux[0].length > 0){
                        aux[0].sort((a,b) => this.values(a) - this.values(b))
                        let alvo = this.table[aux[0][0][1]][aux[0][0][0]]
                        let peca = this.table[j][i]
                        
                        if (peca.toLowerCase() == 'p' &&  this.includes(aux[0],trono)){
                            esperto = true
                            moves.unshift([[i, j], [trono], 'm'])
                        }
                        else {
                            if (alvo != '_'){
                                esperto = true
                                moves.unshift([[i, j], aux[0], 'm'])
                            }
                            else
                                moves.push([[i, j], aux[0], 'm'])
                        }
                    }
                    if (aux[1].length > 0)
                        special.push([[i, j], aux[1], 's'])
                }
            }
        }
        if (special.length > 0)
            escolhas = special[this.rand(special.length)]
        else if (moves.length > 0 && esperto)
            escolhas = moves[0]
        else if (moves.length > 0)
            escolhas = moves[this.rand(moves.length)]
        else
            return null

        let pos = this.table[escolhas[1][0][1]][escolhas[1][0][0]]
        if (teste && pos != '_')
            escolhido = [(escolhas[0]), escolhas[1][0], escolhas[2]]
        else
            escolhido = [(escolhas[0]), escolhas[1][this.rand(escolhas[1].length)], escolhas[2]]
        return escolhido
    }


}


// iut = new Iuten()

// iut.printTable(iut.table)
// let u;


// let mo = 0
// while (!iut.finished){
//     u = iut.bogoSillyIneffectiveChoice(iut.CURPLAYER,true)
//     iut.move(u[0], u[1], iut.CURPLAYER,u[2])
//     mo++
    
// }

// iut.printTable(iut.table)
// console.log(mo, " movimentos")