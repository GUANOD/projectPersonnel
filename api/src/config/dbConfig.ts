import mysql from "mysql";

const devDB: mysql.ConnectionConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "fillrouge",
};

const prodDB: mysql.ConnectionConfig = {
  host: "localhost:3000",
  user: "root",
  password: "",
  database: "filrouge",
};

class DbConnection {
  connection: mysql.Connection;
  autoclose: boolean;

  constructor(autoclose = true) {
    this.connection = mysql.createConnection(
      process.env.NODE_ENV === "production" ? prodDB : devDB
    );
    this.autoclose = autoclose;
  }
  performQuery(request: string, values: any[] = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(request, values, (err, rows, fields) => {
        if (err) {
          if (this.autoclose) {
            this.connection.end();
          }
          return reject(err);
        }
        if (this.autoclose) {
          this.connection.end();
          console.log("Closing connection");
        }
        return resolve({ rows, fields });
      });
    });
  }

  close() {
    this.connection.end();
  }
}

export default DbConnection;
