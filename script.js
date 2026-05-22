const STORAGE_KEY = "reservaProCyclingLeads";

const form = document.querySelector("#reservationForm");
const leadsTable = document.querySelector("#leadsTable");
const formMessage = document.querySelector("#formMessage");
const exportButton = document.querySelector("#exportCsv");
const clearButton = document.querySelector("#clearLeads");

function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function renderLeads() {
  const leads = getLeads();

  if (!leads.length) {
    leadsTable.innerHTML = '<tr><td colspan="5">Todavia no hay reservas guardadas.</td></tr>';
    return;
  }

  leadsTable.innerHTML = leads
    .map(
      (lead) => `
        <tr>
          <td>${escapeHtml(lead.date)}</td>
          <td>${escapeHtml(lead.name)}</td>
          <td>${escapeHtml(lead.phone)}</td>
          <td>${escapeHtml(lead.email)}</td>
          <td>${escapeHtml(lead.product)}</td>
        </tr>
      `
    )
    .join("");
}

function toCsvValue(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function downloadCsv() {
  const leads = getLeads();
  const headers = ["Fecha", "Nombre", "Telefono", "Gmail", "Producto", "Consentimiento"];
  const rows = leads.map((lead) => [
    lead.date,
    lead.name,
    lead.phone,
    lead.email,
    lead.product,
    lead.consent ? "Si" : "No",
  ]);
  const csv = [headers, ...rows].map((row) => row.map(toCsvValue).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "reservas-ciclismo.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const lead = {
    date: new Date().toLocaleString("es-DO"),
    name: data.get("name").trim(),
    phone: data.get("phone").trim(),
    email: data.get("email").trim(),
    product: data.get("product"),
    consent: data.get("consent") === "on",
  };

  if (!lead.email.toLowerCase().endsWith("@gmail.com")) {
    formMessage.textContent = "Usa un correo Gmail valido para guardar la reserva.";
    return;
  }

  const leads = getLeads();
  leads.unshift(lead);
  saveLeads(leads);
  renderLeads();
  form.reset();
  formMessage.textContent = "Reserva guardada. Ya puedes exportarla a CSV cuando quieras.";
});

exportButton.addEventListener("click", () => {
  const leads = getLeads();
  if (!leads.length) {
    formMessage.textContent = "No hay reservas para exportar todavia.";
    return;
  }
  downloadCsv();
});

clearButton.addEventListener("click", () => {
  const leads = getLeads();
  if (!leads.length) {
    formMessage.textContent = "La lista ya esta vacia.";
    return;
  }

  const shouldClear = window.confirm("Quieres borrar todas las reservas guardadas en este navegador?");
  if (!shouldClear) return;

  saveLeads([]);
  renderLeads();
  formMessage.textContent = "Lista local limpiada.";
});

renderLeads();
