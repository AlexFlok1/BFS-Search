class vertexNode{
    name = null
    edges = []
    parent = null

    constructor( name ){
        this.name = name
    }

    addEdges = ( edgeNode ) => {
        this.edges.push( edgeNode )
    }
}

class Graph{
    #nodes = []

    addNode = ( node ) => {
        this.#nodes.push( node )
    }

    bfsSearch = ( start, end ) => {

        let queue = [ start ]
        let visited = []
        let path = []

        if( start.name === end.name ){
            return 'You already here'
        }

        while( queue.length > 0 ){

            let current = queue.shift()
            if( current.name === end.name ){
                path.push( end.name )
                let parent = current.parent
                while( parent ){
                    path.push( parent.name)
                    parent = parent.parent  //bad naming
                }
                return 'Shortest path is: ' + path.reverse().join('->')
            }
            else{
                current.edges.map( edge => { 
                    if( !visited.includes( edge ) )
                        edge.parent = current
                        queue.push( edge ) 
                } )
                visited.push( current )

            }

        }

        return 'Never Found the way :('

    }

    showGraph = () => this.#nodes
}

//create nodes
const NY = new vertexNode( 'NY' )
const ATL = new vertexNode( 'ATL' )
const LA = new vertexNode( 'LA' )
const DAL = new vertexNode( 'DAL' )
const NASH = new vertexNode( 'NASH' )

//init graph
let graph = new Graph()

//add edges
NY.addEdges(NASH)
NY.addEdges(ATL)
graph.addNode( NY )

ATL.addEdges(NY)
ATL.addEdges(LA)
ATL.addEdges(NASH)
graph.addNode( ATL )


LA.addEdges(ATL)
LA.addEdges(DAL)
LA.addEdges(NASH)
graph.addNode( LA )

NASH.addEdges(ATL)
NASH.addEdges(LA)
NASH.addEdges(NY)
graph.addNode( NASH )

DAL.addEdges(LA)
graph.addNode( DAL )

//console.log( graph.showGraph() )
console.log(graph.bfsSearch( ATL, DAL ))