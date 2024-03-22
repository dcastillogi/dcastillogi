import { Github, LinkedIn, Mail, Orchid } from "../lib/icons";

const HERO = {
    "title": "Daniel Castillo",
    "subtitle": "Desarrollador de Soluciones Web | Ingeniero de Sistemas",
    "companies": [
        {
            "logo": "/images/storend.webp",
            "role": "Desarrollador en",
            "name": "storend.com.co",
            "link": "https://storend.com.co"
        },
        {
            "logo": "/images/unal.webp",
            "role": "Ingeniería de Sistemas en",
            "name": "Universidad Nacional de Colombia",
            "link": "https://unal.edu.co"
        }
    ],
    "links": [
        {
            "text": "Contact me",
            "link": "mailto:daniel@dcastillogi.com",
            "icon": (props: React.SVGProps<SVGSVGElement>) => <Mail {...props} />
        },
        {
            "text": "GitHub",
            "link": "https://github.com/dcastillogi",
            "icon": (props: React.SVGProps<SVGSVGElement>) => <Github {...props} />
        },
        {
            "text": "LinkedIn",
            "link": "https://www.linkedin.com/in/dcastillogi/",
            "icon": (props: React.SVGProps<SVGSVGElement>) => <LinkedIn {...props} />
        },
        {
            "text": "ORCiD",
            "link": "https://orcid.org/0009-0006-3199-0002",
            "icon": (props: React.SVGProps<SVGSVGElement>) => <Orchid {...props} />
        }
    ]
}

export default HERO;