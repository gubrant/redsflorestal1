/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  ClipboardCheck, 
  ClipboardCopy, 
  Flame, 
  MapPin, 
  Wind, 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  FileText,
  Clock,
  Trash2,
  Info
} from 'lucide-react';
import bemadLogo from './bemad_logo.png';
import { motion, AnimatePresence } from 'motion/react';

interface ReportData {
  chamada: string;
  lat_graus: string;
  lat_min: string;
  lat_seg: string;
  lon_graus: string;
  lon_min: string;
  lon_seg: string;
  bioma: string;
  caracteristicas: string;
  linha_metros: string;
  sentido_deslocamento: string;
  sentido_vento: string;
  temperatura: string;
  umidade: string;
  dados_atmosfericos_disponiveis: boolean;
  tipo_incendio: string;
  recurso_soprador: boolean;
  recurso_abafador: boolean;
  recurso_sapa: boolean;
  recurso_mochila: boolean;
  recurso_motosserra: boolean;
  recurso_motobomba: boolean;
  recurso_kit_pickup: boolean;
  recurso_queimador: boolean;
  recurso_outros: boolean;
  recurso_outros_txt: string;
  tecnica: string;
  dias_combate: string;
  horas_combate: string;
  minutos_combate: string;
  origem_identificada: boolean;
  origem_lat_graus: string;
  origem_lat_min: string;
  origem_lat_seg: string;
  origem_lon_graus: string;
  origem_lon_min: string;
  origem_lon_seg: string;
  causa: string;
  tem_aceiros: string;
  detalhe_aceiros: string;
  acumulo_combustivel: string;
  litros_agua: string;
  area_aferida: boolean;
  area_queimada: string;
  metodo_afericao: string;
  danos_identificados: boolean;
  danos: string;
  apoio: string;
  plano_contingencia: string;
  outras_info: string;
  responsavel_nao_encontrado: boolean;
}

const initialData: ReportData = {
  chamada: '',
  lat_graus: '',
  lat_min: '',
  lat_seg: '',
  lon_graus: '',
  lon_min: '',
  lon_seg: '',
  bioma: 'cerrado',
  caracteristicas: '',
  linha_metros: '',
  sentido_deslocamento: 'SUDESTE',
  sentido_vento: 'NORTE-SUL',
  temperatura: '',
  umidade: '',
  dados_atmosfericos_disponiveis: true,
  tipo_incendio: 'Superficial',
  recurso_soprador: true,
  recurso_abafador: true,
  recurso_sapa: false,
  recurso_mochila: true,
  recurso_motosserra: false,
  recurso_motobomba: false,
  recurso_kit_pickup: false,
  recurso_queimador: false,
  recurso_outros: false,
  recurso_outros_txt: '',
  tecnica: 'ATAQUE DIRETO ÀS CHAMAS',
  dias_combate: '00',
  horas_combate: '00',
  minutos_combate: '00',
  origem_identificada: true,
  origem_lat_graus: '',
  origem_lat_min: '',
  origem_lat_seg: '',
  origem_lon_graus: '',
  origem_lon_min: '',
  origem_lon_seg: '',
  causa: '',
  tem_aceiros: 'NÃO',
  detalhe_aceiros: '',
  acumulo_combustivel: 'NÃO',
  litros_agua: '0',
  area_aferida: true,
  area_queimada: '',
  metodo_afericao: '',
  danos_identificados: true,
  danos: '',
  apoio: '',
  plano_contingencia: 'NÃO',
  outras_info: '',
  responsavel_nao_encontrado: false,
};

export default function App() {
  const [data, setData] = useState<ReportData>(initialData);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const reportText = useMemo(() => {
    const {
      chamada, lat_graus, lat_min, lat_seg, lon_graus, lon_min, lon_seg,
      bioma, caracteristicas, linha_metros, sentido_deslocamento, sentido_vento,
      dados_atmosfericos_disponiveis, temperatura, umidade, tipo_incendio, 
      recurso_soprador, recurso_abafador, recurso_sapa, recurso_mochila, 
      recurso_motosserra, recurso_motobomba, recurso_kit_pickup, recurso_queimador, 
      recurso_outros, recurso_outros_txt,
      tecnica, 
      dias_combate, horas_combate, minutos_combate,
      origem_identificada, origem_lat_graus, origem_lat_min, origem_lat_seg, origem_lon_graus, origem_lon_min, origem_lon_seg,
      causa, tem_aceiros, detalhe_aceiros, acumulo_combustivel, litros_agua,
      area_aferida, area_queimada, metodo_afericao, danos_identificados, danos, apoio, plano_contingencia, outras_info,
      responsavel_nao_encontrado
    } = data;

    const lat = `${lat_graus || '___'}°${lat_min || '___'}'${lat_seg || '___'}"S`;
    const lon = `${lon_graus || '___'}°${lon_min || '___'}'${lon_seg || '___'}"W`;
    
    const origem_lat = `${origem_lat_graus || '___'}°${origem_lat_min || '___'}'${origem_lat_seg || '___'}"S`;
    const origem_lon = `${origem_lon_graus || '___'}°${origem_lon_min || '___'}'${origem_lon_seg || '___'}"W`;

    const up = (val: string) => (val || '-').toUpperCase();

    const info_causa = causa ? ` COM CAUSA PRESUMIDA ${up(causa)}` : '';
    const info_origem = origem_identificada 
      ? `PRESUME-SE A ORIGEM DO INCÊNDIO SE DEU NO PONTO ${origem_lat_graus ? origem_lat : '__°__\'__._"S'} ${origem_lon_graus ? origem_lon : '__°__\'__._"W'}${info_causa}`
      : 'NÃO FOI POSSÍVEL IDENTIFICAR O PONTO EXATO DE ORIGEM';

    const info_area = area_aferida
      ? `FOI QUEIMADA UMA ÁREA TOTAL DE ${area_queimada || '-'} HA DE ACORDO COM O MÉTODO DE AFERIÇÃO: ${up(metodo_afericao)}`
      : `NÃO FOI POSSÍVEL AFERIR A ÁREA TOTAL QUEIMADA ATÉ O MOMENTO`;

    const info_danos = danos_identificados
      ? `O INCÊNDIO CAUSOU OS SEGUINTES DANOS ${up(danos)}`
      : `NÃO FORAM IDENTIFICADOS DANOS MATERIAIS OU ÀS PESSOAS NO LOCAL`;

    const info_vento_clima = dados_atmosfericos_disponiveis
      ? `O VENTO PREDOMINANTE ESTAVA NO SENTIDO ${up(sentido_vento)}, TEMPERATURA DE ${temperatura || '-'}°C E UMIDADE DO AR DE ${umidade || '-'}%`
      : `NÃO HAVIA MEIO DISPONÍVEL PARA COLETAR OS DADOS ATMOSFÉRICOS`;

    const recursos_list = [];
    if (recurso_soprador) recursos_list.push('SOPRADOR');
    if (recurso_abafador) recursos_list.push('ABAFADOR');
    if (recurso_sapa) recursos_list.push('FERRAMENTAS DE SAPA');
    if (recurso_mochila) recursos_list.push('MOCHILA COSTA / BOLSA COSTAL');
    if (recurso_motosserra) recursos_list.push('MOTOSSERRA');
    if (recurso_motobomba) recursos_list.push('MOTO BOMBA');
    if (recurso_kit_pickup) recursos_list.push('KIT PICKUP');
    if (recurso_queimador) recursos_list.push('QUEIMADOR');
    if (recurso_outros && recurso_outros_txt) recursos_list.push(recurso_outros_txt.toUpperCase());
    else if (recurso_outros) recursos_list.push('OUTROS');

    const recursos_string = recursos_list.length > 0 ? recursos_list.join(', ') : '-';

    const duracao_extenso = `${dias_combate || '00'} DIAS, ${horas_combate || '00'} HORAS E ${minutos_combate || '00'} MINUTOS`;

    const info_plano = plano_contingencia === 'SIM'
      ? 'APRESENTOU O PLANO DE CONTINGÊNCIA DO LOCAL, DEVIDAMENTE ANEXADO A ESTE REDS'
      : 'NÃO APRESENTOU O PLANO DE CONTINGÊNCIA DO LOCAL';

    const info_linha = linha_metros 
      ? `A LINHA DE INCÊNDIO DE APROXIMADAMENTE ${linha_metros} METROS DESLOCAVA-SE NO SENTIDO ${up(sentido_deslocamento)}. `
      : '';

    const label_responsavel = responsavel_nao_encontrado
      ? 'O RESPONSÁVEL PELA UC / PROPRIEDADE NÃO FOI ENCONTRADO'
      : `O RESPONSÁVEL PELA UC (OU ÁREA PARTICULAR) ${info_plano}`;

    return `A GU BM DESLOCOU PARA UM CHAMADO DE SUPOSTO ${up(chamada)}. 
NO LOCAL, COORDENADAS GEOGRÁFICAS ${lat} ${lon}, TRATAVA-SE DE UMA ÁREA DE BIOMA ${bioma.toUpperCase()} COM AS SEGUINTES CARACTERÍSTICAS: ${up(caracteristicas)}. 
${info_linha}${info_vento_clima}. VERIFICOU-SE QUE TRATAVA-SE DE INCÊNDIO ${tipo_incendio.toUpperCase()}.
A GU BM, COM USO DE ${recursos_string} COM UM ${up(tecnica)} DEBELOU O INCÊNDIO APÓS ${duracao_extenso} DE COMBATE. 
${info_origem}.
NO LOCAL, ${tem_aceiros === 'SIM' ? 'HAVIA' : 'NÃO HAVIA'} ACEIROS ${detalhe_aceiros ? `(${up(detalhe_aceiros)})` : ''}, OU OUTRO MÉTODO PREVENTIVO E ${acumulo_combustivel === 'SIM' ? 'HAVIA' : 'NÃO HAVIA'} INDÍCIOS DE ACÚMULO DE COMBUSTÍVEL. FORAM GASTOS ${litros_agua || '0'} LITROS DE ÁGUA. ${info_area}. ${info_danos}.
AS EQUIPES BM RECEBERAM APOIO DE ${up(apoio)}. 
${label_responsavel}.
OUTRAS INFORMAÇÕES RELEVANTES: ${up(outras_info)}.`;
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    if (confirm('Deseja realmente limpar todos os campos?')) {
      setData(initialData);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans text-gray-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={bemadLogo} 
              alt="BEMAD Logo" 
              className="w-12 h-12 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight uppercase tracking-tight">Relatório Padrão de Combate aos incêndios Florestais</h1>
              <p className="text-xs text-gray-500 italic">Formulário Padrão de Registro de Eventos de Defesa Social (REDS)</p>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Column */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-emerald-600 rounded-full" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-700">Preenchimento</h2>
          </div>

          <div className="space-y-6">
            <Section title="1. Dados da Ocorrência">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Dados da Chamada</span>
                  <textarea
                    name="chamada"
                    value={data.chamada}
                    onChange={handleChange}
                    placeholder="Ex: Fumaça saindo de área de mata próxima à rodovia..."
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100 transition-all font-sans"
                    rows={2}
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <CoordinateInput 
                    label="Latitude Local" 
                    prefix="lat" 
                    data={data} 
                    onChange={handleChange} 
                   />
                   <CoordinateInput 
                    label="Longitude Local" 
                    prefix="lon" 
                    data={data} 
                    onChange={handleChange} 
                   />
                </div>
              </div>
            </Section>

            <Section title="2. Bioma e Vegetação">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Bioma Predominante</span>
                  <select
                    name="bioma"
                    value={data.bioma}
                    onChange={handleChange}
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                  >
                    <option value="cerrado">Cerrado</option>
                    <option value="mata atlântica">Mata Atlântica</option>
                    <option value="caatinga">Caatinga</option>
                    <option value="bioma descaracterizado">Bioma Descaracterizado</option>
                    <option value="outro">Outro</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Tipo de Incêndio</span>
                  <select
                    name="tipo_incendio"
                    value={data.tipo_incendio}
                    onChange={handleChange}
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                  >
                    <option value="Superficial">Superficial</option>
                    <option value="subterrâneo">Subterrâneo</option>
                    <option value="de copa">De Copa</option>
                    <option value="total">Incêndio Total</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Características da Vegetação</span>
                <textarea
                  name="caracteristicas"
                  value={data.caracteristicas}
                  onChange={handleChange}
                  placeholder="mata ciliar, mata de galeria, pastagem, mata fechada..."
                  className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all font-sans"
                  rows={2}
                />
              </label>
            </Section>

            <Section title="3. Informações de tempo atmosférico">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <input
                    type="checkbox"
                    id="dados_atmosfericos_disponiveis"
                    checked={!data.dados_atmosfericos_disponiveis}
                    onChange={(e) => setData(prev => ({ ...prev, dados_atmosfericos_disponiveis: !e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="dados_atmosfericos_disponiveis" className="text-xs font-semibold text-gray-600 uppercase tracking-tight mb-0 cursor-pointer">
                    Não havia meio disponível para coletar os dados atmosféricos
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Linha de Fogo (Metros)</span>
                    <input
                      type="number"
                      name="linha_metros"
                      value={data.linha_metros}
                      onChange={handleChange}
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Sentido Deslocamento</span>
                    <input
                      type="text"
                      name="sentido_deslocamento"
                      value={data.sentido_deslocamento}
                      onChange={handleChange}
                      placeholder="Ex: SUDESTE"
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Vento Predominante</span>
                    <input
                      type="text"
                      name="sentido_vento"
                      value={data.sentido_vento}
                      onChange={handleChange}
                      placeholder="Ex: NORTE-SUL"
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                    />
                  </label>
                  {data.dados_atmosfericos_disponiveis && (
                    <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      <label className="block">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Temp (°C)</span>
                        <input
                          type="number"
                          name="temperatura"
                          value={data.temperatura}
                          onChange={handleChange}
                          className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                        />
                      </label>
                      <label className="block">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Umidade (%)</span>
                        <input
                          type="number"
                          name="umidade"
                          value={data.umidade}
                          onChange={handleChange}
                          className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </Section>

            <Section title="4. Recursos e Técnica">
               <div className="space-y-4">
                  <div className="block">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Equipamentos Utilizados</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      {[
                        { id: 'recurso_soprador', label: 'SOPRADOR' },
                        { id: 'recurso_abafador', label: 'ABAFADOR' },
                        { id: 'recurso_sapa', label: 'FERRAMENTAS DE SAPA' },
                        { id: 'recurso_mochila', label: 'MOCHILA COSTA / BOLSA COSTAL' },
                        { id: 'recurso_motosserra', label: 'MOTOSSERRA' },
                        { id: 'recurso_motobomba', label: 'MOTO BOMBA' },
                        { id: 'recurso_kit_pickup', label: 'KIT PICKUP' },
                        { id: 'recurso_queimador', label: 'QUEIMADOR' },
                        { id: 'recurso_outros', label: 'OUTROS' },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={(data as any)[item.id]}
                            onChange={(e) => setData(prev => ({ ...prev, [item.id]: e.target.checked }))}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="text-[10px] font-semibold text-gray-600 group-hover:text-emerald-600 transition-colors">{item.label}</span>
                        </label>
                      ))}
                    </div>
                    {data.recurso_outros && (
                      <input
                        type="text"
                        name="recurso_outros_txt"
                        value={data.recurso_outros_txt}
                        onChange={handleChange}
                        placeholder="Especifique outros equipamentos..."
                        className="mt-2 w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 animate-in fade-in slide-in-from-top-1"
                      />
                    )}
                  </div>
                  <label className="block">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Técnica de Ataque</span>
                    <select
                      name="tecnica"
                      value={data.tecnica}
                      onChange={handleChange}
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                    >
                      <option value="ATAQUE DIRETO ÀS CHAMAS">Ataque Direto</option>
                      <option value="ATAQUE INDIRETO">Ataque Indireto</option>
                      <option value="ATAQUE EM PARALELO">Ataque em Paralelo</option>
                    </select>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <label className="block">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Dias</span>
                      <input
                        type="number"
                        name="dias_combate"
                        value={data.dias_combate}
                        onChange={handleChange}
                        placeholder="00"
                        className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Horas</span>
                      <input
                        type="number"
                        name="horas_combate"
                        value={data.horas_combate}
                        onChange={handleChange}
                        placeholder="00"
                        className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Minutos</span>
                      <input
                        type="number"
                        name="minutos_combate"
                        value={data.minutos_combate}
                        onChange={handleChange}
                        placeholder="00"
                        className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                      />
                    </label>
                  </div>
               </div>
            </Section>

            <Section title="5. Origem e Causa">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <input
                    type="checkbox"
                    id="origem_identificada"
                    checked={!data.origem_identificada}
                    onChange={(e) => setData(prev => ({ ...prev, origem_identificada: !e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="origem_identificada" className="text-xs font-semibold text-gray-600 uppercase tracking-tight mb-0 cursor-pointer">
                    Não foi possível identificar o ponto exato de origem
                  </label>
                </div>

                {data.origem_identificada && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
                     <CoordinateInput 
                      label="Latitude Origem" 
                      prefix="origem_lat" 
                      data={data} 
                      onChange={handleChange} 
                     />
                     <CoordinateInput 
                      label="Longitude Origem" 
                      prefix="origem_lon" 
                      data={data} 
                      onChange={handleChange} 
                     />
                  </div>
                )}
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Causa Presumida</span>
                  <input
                    type="text"
                    name="causa"
                    value={data.causa}
                    onChange={handleChange}
                    placeholder="antrópica, lixão, raio, testemunha..."
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                  />
                </label>
              </div>
            </Section>

            <Section title="6. Aferição e Prevenção">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Existência de Aceiros?</span>
                  <select
                    name="tem_aceiros"
                    value={data.tem_aceiros}
                    onChange={handleChange}
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                  >
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </label>
                {data.tem_aceiros === 'SIM' && (
                  <label className="block">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Detalhes Aceiros</span>
                    <input
                      type="text"
                      name="detalhe_aceiros"
                      value={data.detalhe_aceiros}
                      onChange={handleChange}
                      placeholder="Largura, conservação..."
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                    />
                  </label>
                )}
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Acúmulo de Combustível?</span>
                  <select
                    name="acumulo_combustivel"
                    value={data.acumulo_combustivel}
                    onChange={handleChange}
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                  >
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Água Gasta (Litros)</span>
                  <input
                    type="number"
                    name="litros_agua"
                    value={data.litros_agua}
                    onChange={handleChange}
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                  />
                </label>

                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <input
                      type="checkbox"
                      id="area_aferida"
                      checked={!data.area_aferida}
                      onChange={(e) => setData(prev => ({ ...prev, area_aferida: !e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor="area_aferida" className="text-xs font-semibold text-gray-600 uppercase tracking-tight mb-0 cursor-pointer">
                      Não foi possível aferir a área queimada
                    </label>
                  </div>
                </div>

                {data.area_aferida && (
                  <>
                    <label className="block">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Área Queimada (HA)</span>
                      <input
                        type="text"
                        name="area_queimada"
                        value={data.area_queimada}
                        onChange={handleChange}
                        className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Método de Aferição</span>
                      <input
                        type="text"
                        name="metodo_afericao"
                        value={data.metodo_afericao}
                        onChange={handleChange}
                        placeholder="GPS, SentinelHUB, Google Maps..."
                        className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                      />
                    </label>
                  </>
                )}
                 <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Plano de Contingência?</span>
                  <select
                    name="plano_contingencia"
                    value={data.plano_contingencia}
                    onChange={handleChange}
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                  >
                    <option value="SIM">SIM</option>
                    <option value="NÃO">NÃO</option>
                  </select>
                </label>

                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <input
                      type="checkbox"
                      id="responsavel_nao_encontrado"
                      checked={data.responsavel_nao_encontrado}
                      onChange={(e) => setData(prev => ({ ...prev, responsavel_nao_encontrado: e.target.checked }))}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor="responsavel_nao_encontrado" className="text-xs font-semibold text-gray-600 uppercase tracking-tight mb-0 cursor-pointer">
                      Responsável pela UC / Propriedade não foi encontrado
                    </label>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="7. Danos e Parcerias">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <input
                    type="checkbox"
                    id="danos_identificados"
                    checked={!data.danos_identificados}
                    onChange={(e) => setData(prev => ({ ...prev, danos_identificados: !e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="danos_identificados" className="text-xs font-semibold text-gray-600 uppercase tracking-tight mb-0 cursor-pointer">
                    Danos não foram identificados no local
                  </label>
                </div>

                {data.danos_identificados && (
                  <label className="block animate-in fade-in slide-in-from-top-1 duration-200">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Danos Causados</span>
                    <textarea
                      name="danos"
                      value={data.danos}
                      onChange={handleChange}
                      placeholder="Casas, veículos, animais, plantações, lines de energia..."
                      className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all font-sans"
                      rows={2}
                    />
                  </label>
                )}
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Equipes de Apoio</span>
                  <input
                    type="text"
                    name="apoio"
                    value={data.apoio}
                    onChange={handleChange}
                    placeholder="PMMG, Brigadas, PRF, etc..."
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all h-9 font-sans"
                  />
                </label>
              </div>
            </Section>

            <Section title="8. Finalização">
                <label className="block">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Outras Informações Relevantes</span>
                  <textarea
                    name="outras_info"
                    value={data.outras_info}
                    onChange={handleChange}
                    placeholder="Alterações FEAs, feridos, detenções, objetos encontrados..."
                    className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 transition-all font-sans"
                    rows={3}
                  />
                </label>
            </Section>
          </div>
        </section>

        {/* Preview Column */}
        <section className="lg:sticky lg:top-24 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-emerald-600 rounded-full" />
            <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900">Relatório REDS Gerado</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center px-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Visualização do Texto</span>
              <div className="flex gap-2">
                <button
                  onClick={resetForm}
                  className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500 border border-gray-300 rounded hover:bg-gray-100 transition-all"
                >
                  Limpar
                </button>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded transition-all text-xs font-bold uppercase tracking-wider shadow-sm ${
                    copied ? 'bg-green-600 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
                  {copied ? 'Copiado' : 'Copiar REDS'}
                </button>
              </div>
            </div>
            
            <div className="p-6 h-[65vh] overflow-y-auto whitespace-pre-wrap font-mono text-xs text-gray-700 bg-white leading-relaxed">
              {reportText}
            </div>
          </div>
          
          <p className="text-[10px] text-gray-400 italic px-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Interface Sincronizada para Padrão REDS Ocorrências.
          </p>
        </section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
      <div className="section-title text-[11px] font-bold uppercase tracking-widest text-[#4B5563] mb-6 flex items-center gap-4 after:content-[''] after:flex-grow after:h-px after:bg-[#E5E7EB]">
        {title}
      </div>
      {children}
    </div>
  );
}

function CoordinateInput({ label, prefix, data, onChange }: { 
  label: string; 
  prefix: string; 
  data: any; 
  onChange: (e: any) => void;
}) {
  return (
    <div className="space-y-1">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
        {label}
      </span>
      <div className="grid grid-cols-3 gap-1">
        <div className="relative">
           <input
            type="number"
            name={`${prefix}_graus`}
            value={data[`${prefix}_graus`]}
            onChange={onChange}
            placeholder="G"
            className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-500 transition-all font-sans"
          />
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">°</span>
        </div>
        <div className="relative">
          <input
            type="number"
            name={`${prefix}_min`}
            value={data[`${prefix}_min`]}
            onChange={onChange}
            placeholder="M"
            className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-500 transition-all font-sans"
          />
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">'</span>
        </div>
        <div className="relative">
          <input
            type="number"
            step="0.1"
            name={`${prefix}_seg`}
            value={data[`${prefix}_seg`]}
            onChange={onChange}
            placeholder="S"
            className="w-full bg-[#F9FAFB] border border-[#D1D5DB] rounded px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-500 transition-all font-sans"
          />
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">"</span>
        </div>
      </div>
    </div>
  );
}
