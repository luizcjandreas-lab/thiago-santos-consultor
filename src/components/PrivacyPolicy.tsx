import { CONTACT, LEGAL, PROFILE } from '../config/site';
import { useHash } from '../lib/hooks';
import { isFilled } from '../lib/utils';
import { Dialog, DialogClose } from './ui/Dialog';

/** Política de privacidade, aberta pelo endereço #privacidade */
export function PrivacyPolicy() {
  const hash = useHash();
  const open = hash === '#privacidade';

  const close = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  return (
    <Dialog open={open} onClose={close} labelledBy="privacidade-titulo">
      <div className="flex items-center justify-between gap-4 border-b border-aco px-5 py-3 md:px-8" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))' }}>
        <h2 id="privacidade-titulo" className="font-wide text-[1.25rem] font-bold text-branco">
          Política de privacidade
        </h2>
        <DialogClose onClose={close} label="Fechar política de privacidade" />
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-7 md:px-8" style={{ paddingBottom: 'max(1.75rem, env(safe-area-inset-bottom, 0px))' }}>
        <div className="mx-auto flex max-w-[44rem] flex-col gap-6 text-[0.98rem] leading-relaxed text-nevoa [&_h3]:font-wide [&_h3]:text-[1.05rem] [&_h3]:font-semibold [&_h3]:text-branco">
          <p className="text-[0.88rem] text-cimento">Última atualização: {LEGAL.privacyUpdatedAt}</p>
          <p>
            Este site apresenta o trabalho de {PROFILE.fullName} ({PROFILE.name}), consultor de vendas de veículos. Esta
            política explica quais dados são usados quando você entra em contato e como eles são tratados, de acordo com a Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          <section className="flex flex-col gap-2">
            <h3>Quais dados são coletados</h3>
            <p>
              Os formulários de busca personalizada e de avaliação pedem nome, WhatsApp, informações sobre o veículo desejado ou
              sobre o seu veículo, cidade e observações. Esses dados só são usados quando você confirma o envio.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h3>Como os dados são enviados</h3>
            <p>
              O site não armazena as informações dos formulários. Ao enviar, as respostas são organizadas em uma mensagem que abre
              no seu WhatsApp, e você decide se envia. A partir daí, a conversa segue as regras de privacidade do próprio
              WhatsApp.
            </p>
            <p>
              As fotos escolhidas no formulário de avaliação ficam apenas no seu aparelho e não são enviadas pelo site. Se
              quiser, você as envia na conversa do WhatsApp.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h3>Para que os dados são usados</h3>
            <p>
              Para responder ao seu contato, buscar veículos compatíveis, preparar uma avaliação inicial e combinar atendimentos.
              Seus dados não são vendidos nem compartilhados para fins de publicidade de terceiros.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h3>Cookies e medição de acesso</h3>
            <p>
              Se ferramentas de medição de audiência (como Google Analytics ou Meta Pixel) estiverem ativas, elas só são
              carregadas depois que você aceitar o aviso de cookies. Você pode recusar sem prejuízo ao uso do site.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h3>Seus direitos</h3>
            <p>
              Você pode pedir a confirmação, o acesso, a correção ou a exclusão dos dados enviados na conversa, além de revogar o
              consentimento a qualquer momento.
            </p>
          </section>
          <section className="flex flex-col gap-2">
            <h3>Contato</h3>
            <p>
              Para qualquer solicitação sobre seus dados, fale pelo WhatsApp {CONTACT.whatsappDisplay}
              {isFilled(CONTACT.email) ? ` ou pelo e-mail ${CONTACT.email}` : ''}.
            </p>
          </section>
        </div>
      </div>
    </Dialog>
  );
}
