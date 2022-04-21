import express from "express";
import auth from "./auth";
import dotenv from "dotenv";
import { refreshToken } from "./eaccounting";
import { getProjects } from "./db/project";
import { getDescriptionsByEmail } from "./db/description";

import userRouter from './routes/user';
import transactionRouter from './routes/transaction';
import vismaRouter from './routes/visma';
import timeReportRouter from './routes/timeReport';
import employeeRouter from './routes/employee';
import { connect } from 'mongoose';
import { getSetting, setSetting } from './db/setting';

//getSetting("foo").then(setting => console.log(setting));
//setSetting("foo", "bar2");

// import ProjectModel from './db/models/project';
// const project = new ProjectModel({ customer_name: "Åkeriet AB", project_name: "Hemsida", agreement_ref: "123", active: true });
// project.save();

// import EmployeeModel from './db/models/employee';
// const employee = new EmployeeModel({ firstname: "Jonatan", lastname: "Hallenberg", "email": "jonatan.hallenberg@sprinto.se", fullname: "Jonatan Hallenberg"} );
// employee.save();


const env = process.env.ENV || 'local';
dotenv.config({ path: `config/${env}.env` });
if (env === 'local') {
  dotenv.config({ path: `../config/global.${env}.env` });
} else {
  dotenv.config({ path: `config/global.${env}.env` });
}

const app = express();
const port = 4000;
app.use(auth);
app.use(express.json());

//Routers
app.use('/transaction', transactionRouter);
app.use('/user', userRouter);
app.use('/visma', vismaRouter);
app.use('/', timeReportRouter);
app.use('/employee', employeeRouter);



if (process.env.VISMA_IMPORT_FEATURE === 'true') {
  refreshToken();
}

app.get('/project-list', async (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  }
  else {
    const projects = await getProjects();
    res.json(projects);
  }
});

app.get('/:email/project-list', async (req, res) => {

  const email = req.params.email;

  const projects = await getProjects();
  res.json(projects);
})

app.get('/user/:email/description', async (req, res) => {
  if (!req["isAdmin"]) {
    res.send(401).end();
  } else {
    const response: any = await getDescriptionsByEmail(req.params.email);
    res.json(response);
  }
});

connect('mongodb://localhost:27017/rumbo').then(() => {
  app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
  });
});
