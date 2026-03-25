"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plane,
  CalendarDays,
  Briefcase,
  Filter,
  Star,
  ArrowUpRight,
  MapPin,
  Wallet,
  BadgePercent,
  RefreshCw,
  Building2,
} from "lucide-react";

const promotions = [
  {
    id: 1,
    airline: "GOL",
    origin: "Manaus",
    destination: "São Paulo",
    departureDate: "2026-04-10",
    returnDate: "2026-04-17",
    baggage: "Sem bagagem",
    tripType: "Ida e volta",
    price: 1189,
    highlight: "Melhor preço",
    note: "Boa opção para vitrine principal.",
    url: "https://www.voegol.com.br/",
  },
  {
    id: 2,
    airline: "LATAM",
    origin: "Manaus",
    destination: "Rio de Janeiro",
    departureDate: "2026-04-12",
    returnDate: "2026-04-19",
    baggage: "Bagagem de mão",
    tripType: "Ida e volta",
    price: 1329,
    highlight: "Promoção em destaque",
    note: "Oferta interessante para consulta rápida.",
    url: "https://www.latamairlines.com/br/pt",
  },
  {
    id: 3,
    airline: "AZUL",
    origin: "Manaus",
    destination: "Recife",
    departureDate: "2026-04-08",
    returnDate: "2026-04-15",
    baggage: "Bagagem despachada",
    tripType: "Ida e volta",
    price: 1465,
    highlight: "Flash deal",
    note: "Boa comparação com bagagem inclusa.",
    url: "https://www.voeazul.com.br/",
  },
  {
    id: 4,
    airline: "GOL",
    origin: "Manaus",
    destination: "Belém",
    departureDate: "2026-04-06",
    returnDate: "2026-04-13",
    baggage: "Sem bagagem",
    tripType: "Ida e volta",
    price: 879,
    highlight: "Melhor preço",
    note: "Trecho regional com ótimo custo-benefício.",
    url: "https://www.voegol.com.br/",
  },
  {
    id: 5,
    airline: "LATAM",
    origin: "Manaus",
    destination: "Brasília",
    departureDate: "2026-04-14",
    returnDate: "2026-04-21",
    baggage: "Bagagem de mão",
    tripType: "Ida e volta",
    price: 1249,
    highlight: "Promoção em destaque",
    note: "Boa opção para clientes corporativos.",
    url: "https://www.latamairlines.com/br/pt",
  },
  {
    id: 6,
    airline: "AZUL",
    origin: "Manaus",
    destination: "Fortaleza",
    departureDate: "2026-04-09",
    returnDate: "2026-04-16",
    baggage: "Sem bagagem",
    tripType: "Ida e volta",
    price: 1399,
    highlight: "Flash deal",
    note: "Tarifa boa para monitoramento interno.",
    url: "https://www.voeazul.com.br/",
  },
  {
    id: 7,
    airline: "GOL",
    origin: "Manaus",
    destination: "Belo Horizonte",
    departureDate: "2026-04-11",
    returnDate: "2026-04-18",
    baggage: "Bagagem de mão",
    tripType: "Ida e volta",
    price: 1375,
    highlight: "Promoção em destaque",
    note: "Boa vitrine para o painel inicial.",
    url: "https://www.voegol.com.br/",
  },
  {
    id: 8,
    airline: "LATAM",
    origin: "Manaus",
    destination: "Belém",
    departureDate: "2026-04-05",
    returnDate: "2026-04-12",
    baggage: "Sem bagagem",
    tripType: "Ida e volta",
    price: 915,
    highlight: "Melhor preço",
    note: "Oferta competitiva para rota curta.",
    url: "https://www.latamairlines.com/br/pt",
  },
  {
    id: 9,
    airline: "AZUL",
    origin: "Manaus",
    destination: "São Paulo",
    departureDate: "2026-04-13",
    returnDate: "2026-04-20",
    baggage: "Bagagem de mão",
    tripType: "Ida e volta",
    price: 1288,
    highlight: "Flash deal",
    note: "Alternativa competitiva para rota forte.",
    url: "https://www.voeazul.com.br/",
  },
  {
    id: 10,
    airline: "GOL",
    origin: "Manaus",
    destination: "Brasília",
    departureDate: "2026-04-15",
    returnDate: "2026-04-22",
    baggage: "Bagagem despachada",
    tripType: "Ida e volta",
    price: 1549,
    highlight: "Promoção em destaque",
    note: "Comparação interessante com bagagem inclusa.",
    url: "https://www.voegol.com.br/",
  },
];

const badgeStyles: Record<string, string> = {
  GOL: "bg-orange-500/15 text-orange-300 border border-orange-400/30",
  LATAM: "bg-rose-500/15 text-rose-300 border border-rose-400/30",
  AZUL: "bg-sky-500/15 text-sky-300 border border-sky-400/30",
};

const highlightStyles: Record<string, string> = {
  "Melhor preço": "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30",
  "Promoção em destaque": "bg-violet-500/15 text-violet-300 border border-violet-400/30",
  "Flash deal": "bg-amber-500/15 text-amber-300 border border-amber-400/30",
};

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20";

export default function TravelPromoDashboard() {
  const [savedDeals, setSavedDeals] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    origin: "Manaus",
    destination: "",
    departureDate: "",
    returnDate: "",
    baggage: "Todas",
    airline: "Todas",
    tripType: "Todos",
    maxPrice: "",
  });

  const filteredPromotions = useMemo(() => {
    return [...promotions]
      .filter((item) =>
        filters.origin ? item.origin.toLowerCase().includes(filters.origin.toLowerCase()) : true
      )
      .filter((item) =>
        filters.destination
          ? item.destination.toLowerCase().includes(filters.destination.toLowerCase())
          : true
      )
      .filter((item) => (filters.airline === "Todas" ? true : item.airline === filters.airline))
      .filter((item) => (filters.baggage === "Todas" ? true : item.baggage === filters.baggage))
      .filter((item) => (filters.tripType === "Todos" ? true : item.tripType === filters.tripType))
      .filter((item) => (filters.departureDate ? item.departureDate === filters.departureDate : true))
      .filter((item) => (filters.returnDate ? item.returnDate === filters.returnDate : true))
      .filter((item) => (filters.maxPrice ? item.price <= Number(filters.maxPrice) : true))
      .sort((a, b) => a.price - b.price);
  }, [filters]);

  const featuredPromotions = useMemo(() => {
    return [...promotions].sort((a, b) => a.price - b.price).slice(0, 4);
  }, []);

  const stats = useMemo(() => {
    const cheapest = [...promotions].sort((a, b) => a.price - b.price)[0]?.price ?? 0;
    return {
      totalDeals: promotions.length,
      saved: savedDeals.length,
      cheapest,
    };
  }, [savedDeals]);

  function updateField(field: string, value: string) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  function clearFilters() {
    setFilters({
      origin: "Manaus",
      destination: "",
      departureDate: "",
      returnDate: "",
      baggage: "Todas",
      airline: "Todas",
      tripType: "Todos",
      maxPrice: "",
    });
  }

  function toggleSaveDeal(id: number) {
    setSavedDeals((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_right,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.08),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
        >
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                <BadgePercent className="h-4 w-4" />
                Painel de promoções internas
              </div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
                App da agência para visualizar passagens promocionais com rapidez e organização
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Ferramenta visual para procurar ofertas da GOL, LATAM e AZUL, comparar preços,
                verificar datas e bagagem, e abrir o site oficial da companhia. Sem compra, sem
                checkout, apenas apoio inteligente para sua agência.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
                <Pill icon={Plane} text="Consulta rápida" />
                <Pill icon={Filter} text="Filtros simples" />
                <Pill icon={Building2} text="Uso interno da agência" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Companhias" value="3" icon={Plane} />
              <StatCard label="Ofertas" value={String(stats.totalDeals)} icon={BadgePercent} />
              <StatCard label={`Menor tarifa`} value={`R$ ${stats.cheapest}`} icon={Wallet} />
              <StatCard label="Salvas" value={String(stats.saved)} icon={Star} />
            </div>
          </div>
        </motion.header>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Promoções muito boas</h2>
              <p className="text-sm text-slate-300">As melhores ofertas aparecem logo no início.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredPromotions.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 shadow-xl backdrop-blur-md"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[deal.airline]}`}>
                    {deal.airline}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${highlightStyles[deal.highlight]}`}>
                    {deal.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight">
                  {deal.origin} → {deal.destination}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{deal.note}</p>

                <div className="mt-4 space-y-1 text-sm text-slate-300">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(deal.departureDate)} a {formatDate(deal.returnDate)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {deal.baggage}
                  </p>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">A partir de</p>
                    <p className="text-3xl font-bold">R$ {deal.price}</p>
                  </div>
                  <a
                    href={deal.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                  >
                    Ver <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Buscar promoções</h2>
              <p className="text-sm text-slate-300">
                Pesquise por rota, data, bagagem e faixa de valor.
              </p>
            </div>

            <button
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4" />
              Limpar filtros
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field label="Origem" icon={MapPin}>
              <input
                className={inputClass}
                value={filters.origin}
                onChange={(e) => updateField("origin", e.target.value)}
                placeholder="Ex: Manaus"
              />
            </Field>
            <Field label="Destino" icon={Plane}>
              <input
                className={inputClass}
                value={filters.destination}
                onChange={(e) => updateField("destination", e.target.value)}
                placeholder="Ex: São Paulo"
              />
            </Field>
            <Field label="Data de ida" icon={CalendarDays}>
              <input
                type="date"
                className={inputClass}
                value={filters.departureDate}
                onChange={(e) => updateField("departureDate", e.target.value)}
              />
            </Field>
            <Field label="Data de volta" icon={CalendarDays}>
              <input
                type="date"
                className={inputClass}
                value={filters.returnDate}
                onChange={(e) => updateField("returnDate", e.target.value)}
              />
            </Field>
            <Field label="Bagagem" icon={Briefcase}>
              <select
                className={inputClass}
                value={filters.baggage}
                onChange={(e) => updateField("baggage", e.target.value)}
              >
                <option>Todas</option>
                <option>Sem bagagem</option>
                <option>Bagagem de mão</option>
                <option>Bagagem despachada</option>
              </select>
            </Field>
            <Field label="Companhia" icon={Building2}>
              <select
                className={inputClass}
                value={filters.airline}
                onChange={(e) => updateField("airline", e.target.value)}
              >
                <option>Todas</option>
                <option>GOL</option>
                <option>LATAM</option>
                <option>AZUL</option>
              </select>
            </Field>
            <Field label="Tipo de viagem" icon={Plane}>
              <select
                className={inputClass}
                value={filters.tripType}
                onChange={(e) => updateField("tripType", e.target.value)}
              >
                <option>Todos</option>
                <option>Ida e volta</option>
              </select>
            </Field>
            <Field label="Preço máximo" icon={Wallet}>
              <input
                type="number"
                className={inputClass}
                value={filters.maxPrice}
                onChange={(e) => updateField("maxPrice", e.target.value)}
                placeholder="Ex: 1500"
              />
            </Field>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Resultados</h2>
              <p className="text-sm text-slate-300">Ofertas ordenadas do menor preço para o maior.</p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              {filteredPromotions.length} ofertas encontradas
            </div>
          </div>

          {filteredPromotions.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-12 text-center">
              <Search className="mx-auto h-10 w-10 text-slate-400" />
              <p className="mt-4 text-lg font-semibold">Nenhuma promoção encontrada</p>
              <p className="mt-2 text-sm text-slate-300">
                Tente mudar os filtros para encontrar mais opções.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredPromotions.map((deal, index) => {
                const isSaved = savedDeals.includes(deal.id);
                return (
                  <motion.article
                    key={deal.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-md transition hover:-translate-y-1 hover:border-white/20"
                  >
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[deal.airline]}`}>
                        {deal.airline}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${highlightStyles[deal.highlight]}`}>
                        {deal.highlight}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {deal.baggage}
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">
                          {deal.origin} → {deal.destination}
                        </h3>
                        <div className="mt-3 space-y-2 text-sm text-slate-300">
                          <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" /> Ida: {formatDate(deal.departureDate)}
                          </p>
                          <p className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" /> Volta: {formatDate(deal.returnDate)}
                          </p>
                          <p className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4" /> {deal.baggage}
                          </p>
                          <p>{deal.note}</p>
                        </div>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Preço</p>
                        <p className="text-3xl font-bold">R$ {deal.price}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={deal.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                      >
                        Abrir site oficial
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => toggleSaveDeal(deal.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
                      >
                        <Star className={`h-4 w-4 ${isSaved ? "fill-yellow-300 text-yellow-300" : ""}`} />
                        {isSaved ? "Oferta salva" : "Salvar para análise"}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      {children}
    </label>
  );
}

function Pill({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
      <Icon className="h-4 w-4 text-cyan-300" />
      <span>{text}</span>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="mb-3 inline-flex rounded-xl bg-white/5 p-2">
        <Icon className="h-5 w-5 text-cyan-300" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div>
    </div>
  );
}

function formatDate(date: string) {
  if (!date) return "-";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
