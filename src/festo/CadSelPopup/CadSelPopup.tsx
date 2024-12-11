import './CadSelPopup.scss';

import { ConfirmModal, TabPane, Tabs } from '@festo-ui/react';

import CadDownload from '../CadDownload/CadDownload';
import CadMeta from '../CadMeta/CadMeta';

export type CadSelPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  article: string;
};

export default function CadSelPopup({ isOpen, onClose }: CadSelPopupProps) {
  const body = (
    <>
      <CadMeta />

      <div className="cs-tab">
        <Tabs>
          <TabPane name="Selection">
            <CadDownload />
          </TabPane>

          <TabPane name="Your CAD download history [9]">Comming soon.</TabPane>
        </Tabs>
      </div>
    </>
  );

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={() => onClose()}
      onCancel={() => onClose()}
      onOk={() => onClose()}
      title="CAD for Valve terminal"
      body={body}
      className="cs-popup"
    />
  );
}
