import * as bcrypt from 'bcrypt';

export interface SeedUser {
  password:  string;
  username:  string;
  email:     string;
  isActive:  boolean;
  roles:     string[];
  _id:       string;
  createdAt: string;
  updatedAt: string;
}


interface SeedProfesional {
  password:            string;
  username:            string;
  email:               string;
  isActive:            boolean;
  roles:               string[];
  foto:                string;
  documentoIdentidad:  string;
  certificadoEstudios: string[];
  categoriasTrabajo:   string;
  ubicacion:           string;
  _id:                 string;
  createdAt:           string;
  updatedAt:           string;
}

interface SeedData {
  users: SeedUser[];
  profesionals: SeedProfesional[];
}

export const initialData: SeedData = {

  users: [
      {
        password: bcrypt.hashSync( 'Abc123+', 10 ),
        username: "user1",
        email: "user1@example.com",
        isActive: true,
        roles: ["admin"],
        _id: "66042749aa2d72f96642bfc7",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        password: bcrypt.hashSync( 'Abc123+', 10 ),
        username: "user2",
        email: "user2@example.com",
        isActive: true,
        roles: ["user"],
        _id: "66042909f201544705276e19",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        password: bcrypt.hashSync( 'Abc123+', 10 ),
        username: "user3",
        email: "user3@example.com",
        isActive: false,
        roles: ["soporte"],
        _id: "6605b16bd9f674308f2628c0",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
  ],

  profesionals: [
    {
      password: bcrypt.hashSync( 'Abc123+', 10 ),
      username: "User One",
      email: "userone@example.com",
      isActive: false,
      roles: ["profesional"],
      foto: "user1.jpg",
      documentoIdentidad: "1234567890",
      certificadoEstudios: ["degree1", "degree2"],
      categoriasTrabajo: "category1",
      ubicacion: "location1",
      _id: "66058699848eef55088a726f",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      password: bcrypt.hashSync( 'Abc123+', 10 ),
      username: "User Two",
      email: "usertwo@example.com",
      isActive: false,
      roles: ["profesional"],
      foto: "user2.jpg",
      documentoIdentidad: "0987654321",
      certificadoEstudios: ["degree3", "degree4"],
      categoriasTrabajo: "category2",
      ubicacion: "location2",
      _id: "66058e30b01b1026401d142f",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      password: bcrypt.hashSync( 'Abc123+', 10 ),
      username: "User Three",
      email: "userthree@example.com",
      isActive: false,
      roles: ["profesional"],
      foto: "user3.jpg",
      documentoIdentidad: "5678901234",
      certificadoEstudios: ["degree5", "degree6"],
      categoriasTrabajo: "category3",
      ubicacion: "location3",
      _id: "6604c5aa6a3485b9fd0acfca",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    ]
}