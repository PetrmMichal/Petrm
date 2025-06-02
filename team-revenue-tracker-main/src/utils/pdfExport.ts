
import { CommissionEntry } from "@/types/commission";
import { format } from "date-fns";
import { cs } from "date-fns/locale";

export const downloadDailyRecordAsPDF = (
  selectedDate: Date,
  entries: CommissionEntry[],
  teamGoal: number,
  teamTotal: number
) => {
  // Create a simple HTML content for PDF generation
  const getTotalCommission = (entry: CommissionEntry) => {
    return entry.postpaid + entry.indTv + entry.zbytek;
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Denní záznam provizí - ${format(selectedDate, 'dd.MM.yyyy')}</title>
      <meta charset="utf-8">
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px; 
          font-size: 12px;
        }
        h1 { 
          color: #333; 
          border-bottom: 2px solid #ddd; 
          padding-bottom: 10px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px;
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: center;
        }
        th { 
          background-color: #f5f5f5; 
          font-weight: bold;
        }
        .summary { 
          margin-top: 20px; 
          padding: 15px; 
          background-color: #f9f9f9; 
          border-radius: 5px;
        }
        .summary h2 { 
          margin-top: 0; 
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Denní záznam provizí</h1>
      <p><strong>Datum:</strong> ${format(selectedDate, 'EEEE, d. MMMM yyyy', { locale: cs })}</p>
      
      <table>
        <thead>
          <tr>
            <th>Jméno</th>
            <th>Postpaid</th>
            <th>IND + TV</th>
            <th>Zbytek</th>
            <th>Celkem</th>
            <th>Cíl</th>
            <th>Plnění (%)</th>
            <th>Aktualizace</th>
          </tr>
        </thead>
        <tbody>
          ${entries.map(entry => {
            const total = getTotalCommission(entry);
            const percentage = entry.dailyGoal > 0 ? Math.round((total / entry.dailyGoal) * 100) : 0;
            return `
              <tr>
                <td style="text-align: left;">${entry.name}</td>
                <td>${entry.postpaid.toLocaleString()} Kč</td>
                <td>${entry.indTv.toLocaleString()} Kč</td>
                <td>${entry.zbytek.toLocaleString()} Kč</td>
                <td><strong>${total.toLocaleString()} Kč</strong></td>
                <td>${entry.dailyGoal.toLocaleString()} Kč</td>
                <td>${percentage}%</td>
                <td>${entry.lastUpdated}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
      
      <div class="summary">
        <h2>Souhrn týmu</h2>
        <p><strong>Celkový součet týmu:</strong> ${teamTotal.toLocaleString()} Kč</p>
        <p><strong>Cíl týmu:</strong> ${teamGoal.toLocaleString()} Kč</p>
        <p><strong>Plnění týmu:</strong> ${teamGoal > 0 ? Math.round((teamTotal / teamGoal) * 100) : 0}%</p>
      </div>
      
      <p style="margin-top: 30px; font-size: 10px; color: #666;">
        Vygenerováno: ${format(new Date(), 'dd.MM.yyyy HH:mm:ss')}
      </p>
    </body>
    </html>
  `;

  // Create a blob and download it
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `denni-zaznam-${format(selectedDate, 'yyyy-MM-dd')}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log(`Downloaded daily record for ${format(selectedDate, 'yyyy-MM-dd')}`);
};
