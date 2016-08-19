import { exec } from 'shelljs'

interface CmdOutput {
    stdout: Object | string
    stderr: string
    code: number
}

export function execDocker( command: string, id: string, options: string='' ): CmdOutput {

    const sanitizedId = /[-./0-9a-z:]*/.exec( id )

    const execString = `docker ${ command } ${ options } ${ sanitizedId }`

    console.log( execString )

    const output = exec(
        execString,
        { silent: true }
    ) as any

    let stdout

    if ( output.stdout.substr( 0,1 ) === '[' ) {

        stdout = JSON.parse( output.stdout )

    } else {

        stdout = output.stdout.replace( /\n|'/g, '' );

    }

    return {
        stdout: stdout,
        stderr: output.stderr,
        code: output.code
    }

}