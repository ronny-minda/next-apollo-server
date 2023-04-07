import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { v1 as uuid } from 'uuid'

const personas = [
  {
    id: 1,
    nombre: "Juan",
    telefono: "555-1234",
    ciudad: "Ciudad de México"
  },
  {
    id: 2,
    nombre: "Ana",
    telefono: "555-5678",
    ciudad: "Guadalajara"
  },
  {
    id: 3,
    nombre: "Pedro",
    telefono: "555-9012",
    ciudad: "Monterrey"
  },
  {
    id: 4,
    nombre: "María",
    telefono: "555-3456",
    ciudad: "Puebla"
  },
  {
    id: 5,
    nombre: "Luis",
    telefono: "555-7890",
    ciudad: "Tijuana"
  }
];



const typeDefs = gql`
  type Person {
    id: String!
    nombre: String!
    telefono: String
    ciudad: String
  }

  type Query {
    personCount: Int!
    allPerson: [Person]!
    numeroPersonas(numero: Int!): [Person]
  }

  type Mutation {
    addPerson(
      nombre: String!
      telefono: String!
      ciudad: String!
    ): Person
  }
`;

const resolvers = {
  Query: {
    personCount: () => personas.length,
    allPerson: () => personas,
    numeroPersonas: (root, args) => {
      const {numero} = args
      return personas.slice(0, numero)
    }
  },
  Mutation: {
    addPerson: (root, args) => {
      const persona = {...args, id: uuid()}
      personas.push(persona)
      console.log(persona)
      return persona
    }
  }
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
  introspection: true,
  playground: true
});

export default startServerAndCreateNextHandler(server);


// Instalacion 
// npm install @apollo/server graphql
// npm i @as-integrations/next