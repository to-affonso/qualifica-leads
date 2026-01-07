# 📦 Static Export - Qualifica Leads

Este projeto foi configurado para gerar um **static export** que pode ser servido por qualquer servidor web estático.

## 🚀 Como Gerar o Build Estático

```bash
# Instalar dependências
npm install

# Gerar build estático
npm run build

# Os arquivos estáticos serão gerados na pasta 'out/'
```

## 📁 Estrutura dos Arquivos Gerados

Após executar `npm run build`, os arquivos estáticos estarão disponíveis em:

```
out/
├── _next/                 # Assets do Next.js (CSS, JS)
├── atendimentos/          # Página de atendimentos
│   ├── detalhes/         # Página de detalhes (aceita ?id=X)
│   └── index.html
├── catalogo-imoveis/      # Página do catálogo
├── configuracoes/         # Página de configurações
├── images/               # Imagens estáticas
└── index.html            # Página inicial (redireciona para atendimentos)
```

## 🌐 Como Servir os Arquivos

### Opção 1: Servidor Local (para testes)
```bash
# Usando Python
cd out && python -m http.server 8000

# Usando Node.js (serve)
npx serve out

# Usando PHP
cd out && php -S localhost:8000
```

### Opção 2: Deploy em Servidores Web
- **Apache**: Copie a pasta `out/` para o diretório do servidor
- **Nginx**: Configure o root para apontar para a pasta `out/`
- **CDN/Static Hosting**: Upload da pasta `out/` (Vercel, Netlify, GitHub Pages, etc.)

## 🔗 Navegação

### URLs Funcionais:
- `/` - Página inicial (redireciona para atendimentos)
- `/atendimentos/` - Lista de atendimentos
- `/atendimentos/detalhes/?id=1` - Detalhes do atendimento (ID via query parameter)
- `/catalogo-imoveis/` - Catálogo de imóveis
- `/configuracoes/` - Configurações

### Mudanças na Navegação:
- ✅ **Antes**: `/atendimentos/[id]` (rota dinâmica)
- ✅ **Agora**: `/atendimentos/detalhes?id=[id]` (query parameter)

## ⚙️ Configurações Aplicadas

### Next.js Config (`next.config.ts`):
```typescript
{
  output: 'export',           // Habilita static export
  trailingSlash: true,        // Adiciona / no final das URLs
  images: { unoptimized: true } // Desabilita otimização de imagens
}
```

### Componentes Ajustados:
- **Rotas Dinâmicas**: Convertidas para query parameters
- **useSearchParams**: Envolvido em Suspense boundary
- **Imagens**: Configuradas com `unoptimized: true`
- **Redirecionamentos**: Implementados client-side

## 🔧 Integração com Backend

### Para APIs Externas:
```javascript
// Exemplo de integração com API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

fetch(`${API_BASE_URL}/api/atendimentos`)
  .then(response => response.json())
  .then(data => console.log(data));
```

### Variáveis de Ambiente:
Crie um arquivo `.env.local`:
```
NEXT_PUBLIC_API_URL=https://sua-api.com
NEXT_PUBLIC_APP_ENV=production
```

## 📋 Checklist de Deploy

- [ ] Build gerado com sucesso (`npm run build`)
- [ ] Pasta `out/` criada com todos os arquivos
- [ ] Teste local funcionando (`npx serve out`)
- [ ] Navegação entre páginas funcionando
- [ ] Imagens carregando corretamente
- [ ] APIs externas configuradas (se aplicável)

## 🎯 Benefícios do Static Export

1. **Performance**: Carregamento mais rápido
2. **Simplicidade**: Não precisa de servidor Node.js
3. **Portabilidade**: Funciona em qualquer servidor web
4. **Escalabilidade**: Pode ser servido via CDN
5. **Integração**: Facilita conexão com backends externos

## 🔍 Troubleshooting

### Problema: Página não carrega
- Verifique se o servidor está servindo arquivos estáticos
- Confirme se o `trailingSlash: true` está configurado

### Problema: Imagens não aparecem
- Verifique se as imagens estão na pasta `public/`
- Confirme se `images.unoptimized: true` está configurado

### Problema: Navegação não funciona
- Verifique se está usando query parameters (`?id=1`)
- Confirme se o componente está envolvido em Suspense

---

**✅ Projeto pronto para integração com backend e deploy estático!**