import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { getOrder } from "../../api/api";
import type { Order } from "../../types/types";

const statusPTBR: Record<string, string> = {
  pending: "Pendente",
  paid: "Pago",
  failed: "Falhou",
  canceled: "Cancelado",
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrder();
        setOrders(data);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  return (
    <>
            <Header />
      <div className="min-h-screen bg-gradient-to-l from-primary to-[#090814] text-white p-6">


        <div className="max-w-4xl mx-auto mt-10">
          <h1 className="text-3xl font-semibold mb-6">Meus Pedidos</h1>

          {loading ? (
            <p>Carregando pedidos...</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-300">Nenhum pedido encontrado.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-black/30 p-4 rounded-lg border border-white/10"
                >
                    <p><strong>Pedido:</strong> {order.id ?? "N/A"}</p>
                  <p><strong>Pacote:</strong> {order.packageName ?? "N/A"}</p>
                  <p><strong>Créditos:</strong> {order.credits ?? 0}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={order.isPaid ? "text-green-400" : "text-red-400"}>
                      {statusPTBR[order.status] ?? order.status ?? "Desconhecido"}
                    </span>
                  </p>
                  <p><strong>Preço:</strong> R$ {(order.price ?? 0).toFixed(2)}</p>
                  <p>
                    <strong>Data:</strong>{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "Indisponível"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
