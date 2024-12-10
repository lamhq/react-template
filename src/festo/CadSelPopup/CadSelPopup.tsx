import { Card, CardBody, CardHeader, ConfirmModal, TabPane, Tabs } from '@festo-ui/react';
import styles from './CadSelPopup.module.css';

export type CadSelPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  article: string;
};

export default function CadSelPopup({ isOpen, onClose }: CadSelPopupProps) {
  const body = (
    <>
      <table className={styles.cadMeta}>
        <tbody>
          <tr>
            <th>Part no.</th>
            <td>569926</td>
          </tr>
          <tr>
            <th>Order code</th>
            <td>
              34P-CX-N-U4A-MILE
              <br />
              50E-NMKBQPF33GCLKA-L+GS
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.cadTab}>
      <Tabs>
        <TabPane name="Selection" className={styles.cadTab}>
          <Card>
            <CardHeader title="Your CAD system" />
            <CardBody
              text="Lorem ipsum."
            >dddd</CardBody>
          </Card>
        </TabPane>
        <TabPane name="Your CAD download history [9]" className={styles.cadTab}>
          Almost before we knew it, we had left the ground.
        </TabPane>
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
    />
  );
}
