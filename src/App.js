

function App() {
  return (
    <div>
      <h1 className="text-center">Multisig</h1>

      <div className="row">
        <div className="col-sm-12">
          <p>Balance: <b></b> wei </p>
        </div>
      </div>

        <div className="row">
          <div className="col-sm-12">
            <h2>Create transfer</h2>
            <form>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input type="number" className="form-control" id="amount" />
              </div>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input type="text" className="form-control" id="to" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <h2>Approve transfer</h2>
            <ul>
              <li>TransferId:</li>
              <li>Amount:</li>
              <li>Approvals:</li>
            </ul>
            <button 
              type="submit" 
              className="btn btn-primary"
            >Submit</button>
          </div>
        </div>
    </div>
  );
}

export default App;
