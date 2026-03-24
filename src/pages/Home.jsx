import { useState, useEffect } from 'react';

export default function Home() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de busca no banco
    setTimeout(() => {
      setEquipamentos([
        { id: 1, nome: "Servidor Dell R740", tipo: "Servidor", responsavel: "Admin TI", status: "Online" },
        { id: 2, nome: "Switch Cisco 24p", tipo: "Rede", responsavel: "Suporte N1", status: "Online" },
        { id: 3, nome: "Firewall Fortigate", tipo: "Segurança", responsavel: "Segurança", status: "Manutenção" },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const salvarEquipamento = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const novo = {
      id: Date.now(),
      nome: formData.get('nome'),
      tipo: formData.get('tipo'),
      responsavel: formData.get('responsavel'),
      status: formData.get('status') // Agora pega o valor selecionado no formulário
    };
    
    setEquipamentos([...equipamentos, novo]);
    setIsModalOpen(false);
  };

  // Função auxiliar para definir as cores das etiquetas de status na tabela
  const getStatusColor = (status) => {
    switch (status) {
      case 'Online': return 'bg-[#238636]/15 text-[#3fb950] border-[#238636]/30';
      case 'Offline': return 'bg-[#f85149]/15 text-[#f85149] border-[#f85149]/30';
      case 'Manutenção': return 'bg-[#d29922]/15 text-[#d29922] border-[#d29922]/30';
      case 'Alerta': return 'bg-[#db6d28]/15 text-[#db6d28] border-[#db6d28]/30';
      default: return 'bg-[#30363d] text-[#8b949e] border-[#30363d]';
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn relative pb-10">
      
      {/* HEADER */}
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#f0f6fc]">Inventário de Ativos</h1>
          <p className="text-[#8b949e]">Gestão técnica e status em tempo real</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
        >
          + Novo Equipamento
        </button>
      </header>

      {/* TABELA */}
      <div className="bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-[#0d1117] border-b border-[#30363d]">
            <tr>
              <th className="px-6 py-4 text-xs uppercase font-bold text-[#8b949e]">Equipamento</th>
              <th className="px-6 py-4 text-xs uppercase font-bold text-[#8b949e]">Tipo</th>
              <th className="px-6 py-4 text-xs uppercase font-bold text-[#8b949e]">Responsável</th>
              <th className="px-6 py-4 text-xs uppercase font-bold text-[#8b949e]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#30363d]">
            {loading ? (
              <tr><td colSpan="4" className="p-10 text-center text-[#8b949e]">Sincronizando com Banco...</td></tr>
            ) : (
              equipamentos.map((item) => (
                <tr key={item.id} className="hover:bg-[#1f242c] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#f0f6fc]">{item.nome}</td>
                  <td className="px-6 py-4 text-[#8b949e]">{item.tipo}</td>
                  <td className="px-6 py-4 text-[#8b949e]">{item.responsavel}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL (POP-UP) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

          <div className="relative bg-[#161b22] border border-[#30363d] w-full max-w-lg rounded-2xl shadow-2xl p-8 animate-fadeIn">
            <h2 className="text-[#f0f6fc] text-xl font-bold mb-6">Registrar Ativo no Banco</h2>

            <form onSubmit={salvarEquipamento} className="space-y-4">
              <div>
                <label className="block text-[#8b949e] text-sm font-medium mb-1">Nome do Equipamento</label>
                <input name="nome" required autoFocus className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] focus:border-[#58a6ff] outline-none" placeholder="Ex: Roteador Borda" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8b949e] text-sm font-medium mb-1">Tipo</label>
                  <select name="tipo" className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] outline-none cursor-pointer">
                    <option value="Notebook">Notebook</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8b949e] text-sm font-medium mb-1">Responsável</label>
                  <input name="responsavel" required className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] outline-none" placeholder="Técnico" />
                </div>
              </div>

              {/* CAMPO DE STATUS SOLICITADO */}
              <div>
                <label className="block text-[#8b949e] text-sm font-medium mb-1">Status de Implantação</label>
                <select name="status" className="w-full p-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] outline-none focus:border-[#58a6ff] cursor-pointer">
                  <option value="Online">Online / Ativo</option>
                  <option value="Offline">Offline / Desativado</option>
                  <option value="Manutenção">Em Manutenção</option>
                </select>
              </div>

              <div className="flex gap-3 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-[#8b949e] hover:bg-[#30363d] rounded-lg transition-all font-medium">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg font-bold shadow-md hover:shadow-[#238636]/20">Confirmar Registro</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}