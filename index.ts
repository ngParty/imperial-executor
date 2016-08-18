import * as express from 'express'
import * as bodyParser from 'body-parser'
import { execDocker } from './exec-docker'

const app = express()

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );


const port = 8080

const router = express.Router()

router.route( '/services' )
    .get( ( req, res ) => {

        res.sendStatus( 501 );

    } )
    .post( ( req, res ) => {

        const portParam = req.body.servicePort
        const options = portParam ? `-p ${ portParam }` : ''

        const exec = execDocker( `service create`, req.body.imageName, options )

        const output = {
            exec: exec,
            serviceId: exec.stdout
        } as any

        if ( portParam ) {

            output.port = execDocker(
                'service inspect', 
                output.serviceId, 
                `--format="'{{(index .Endpoint.Ports 0).PublishedPort}}'"`
            ).stdout

        }

        res.json( output )

    })

router.route( '/services/:serviceId' )
    .get( ( req, res ) => {

        res.json( execDocker( 'service inspect', req.params.serviceId ) )

    } )
    .delete( ( req, res ) => {
        
        res.json( execDocker( 'service rm', req.params.serviceId ) )

    } )



app.use( '/', router )

app.listen( port )
console.log( `Check port ${ port }` )