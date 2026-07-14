function SummaryCard({ stats }) {

  return (

    <div className="summary-box">

      <div className="summary-item">

        <span>Total Revenue</span>

        <strong>
          ₹ {Number(stats.revenue).toLocaleString()}
        </strong>

      </div>

      <div className="summary-item">

        <span>Total Cost</span>

        <strong>
          ₹ {Number(stats.cost).toLocaleString()}
        </strong>

      </div>

      <div className="summary-item">

        <span>Total Sales</span>

        <strong>
          {stats.sales}
        </strong>

      </div>

      <div className="summary-item">

        <span>Total Quantity</span>

        <strong>
          {stats.quantity}
        </strong>

      </div>

    </div>

  );

}

export default SummaryCard;