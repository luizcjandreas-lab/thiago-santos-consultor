import { motion } from 'framer-motion';
import { CircleCheck, MessageCircle, PencilLine } from 'lucide-react';
import { EASE_OUT } from '../../lib/motion';
import { Button, ButtonLink } from './Button';

interface Props {
  url: string;
  /** true quando a nova aba do WhatsApp abriu sozinha */
  opened: boolean;
  onEdit: () => void;
  onTrack?: () => void;
}

/** Tela exibida depois que o formulário gera a mensagem para o WhatsApp */
export function SubmitResult({ url, opened, onEdit, onTrack }: Props) {
  return (
    <motion.div
      role="status"
      className="flex flex-col items-start gap-5 py-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      <CircleCheck size={34} strokeWidth={1.6} className="text-ok" aria-hidden="true" />
      <div>
        <p className="font-wide text-[1.35rem] font-bold text-branco">
          {opened ? 'Mensagem pronta no WhatsApp' : 'Sua mensagem está pronta'}
        </p>
        <p className="mt-2 max-w-md leading-relaxed text-nevoa">
          {opened
            ? 'Abrimos o WhatsApp com as suas informações organizadas. É só conferir e enviar. Se a conversa não abriu, use o botão abaixo.'
            : 'Toque no botão abaixo para abrir o WhatsApp com as suas informações organizadas. É só conferir e enviar.'}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={url} size="lg" icon={<MessageCircle size={20} strokeWidth={2} aria-hidden="true" />} onClick={onTrack}>
          Abrir conversa no WhatsApp
        </ButtonLink>
        <Button variant="secondary" size="lg" onClick={onEdit} icon={<PencilLine size={18} aria-hidden="true" />}>
          Editar informações
        </Button>
      </div>
    </motion.div>
  );
}
