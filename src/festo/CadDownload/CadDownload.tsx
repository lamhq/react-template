import './CadDownload.scss';

import { Button } from '@festo-ui/react';
import RadioField from '../RadioField/RadioField';

const options1 = [
  'Adobe PDF',
  'AutoCAD',
  'CATIA',
  'Creo',
  'EPLAN',
  'Inventor',
  'NX (Siemens)',
  'OneSpace Designer',
].map((item, idx) => ({ value: idx.toString(), label: item }));

const options2 = [
  '3D Creo Parametric 5 (*.asm, *.prt)',
  '3D Creo Parametric 7 (*.asm, *.prt)',
  '3D Creo Parametric 8 (*.asm, *.prt)',
  '3D Creo Parametric 9 (*.asm, *.prt)',
  '3D Creo Parametric 10 (*.asm, *.prt)',
  '3D Creo Parametric 11 (*.asm, *.prt)',
  '3D Creo Parametric 5-10 PART2cad (*.asm, *.prt)',
  '3D Creo Elements/Direct Modeling <=17 (*.lsp)',
].map((item, idx) => ({ value: idx.toString(), label: item }));

const options3 = ['High', 'Low'].map((item, idx) => ({
  value: idx.toString(),
  label: item,
}));

const options4 = ['Full featured CAD model', 'Low'].map((item, idx) => ({
  value: idx.toString(),
  label: item,
}));

export default function CadDownload() {
  return (
    <>
      {/* Gray box */}
      <div className="fwe-bg-gray-100 fwe-p-3 fwe-p-sm-4">
        <div className="fwe-grid">
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3 fwe-p-2 fwe-p-sm-3 fwe-bg-white">
            <RadioField title="Your CAD system" options={options1} />
          </div>
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3 fwe-p-2 fwe-p-sm-3 fwe-bg-white">
            <RadioField title="CAD format" options={options2} />
          </div>
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3 fwe-p-2 fwe-p-sm-3 fwe-bg-white">
            <RadioField title="Level of detail" options={options3} />
            <RadioField
              title="Type of CAD"
              options={options4}
              className="fwe-mt-6"
            />
          </div>
          <div className="fwe-col-12 fwe-col-sm-6 fwe-col-md-3 fwe-p-2 fwe-p-sm-3 fwe-bg-white">
            Preview
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fwe-grid fwe-mt-3">
        <div className="fwe-d-none fwe-d-sm-flex fwe-col-sm-4 fwe-col-lg-6 fwe-align-items-center">
          <span>
            By using this site, you agree to{' '}
            <a href="https://www.festo.com/gb/en/e/legal-information/terms-and-conditions-id_3747/">
              Cadenas' terms & conditions
            </a>
          </span>
        </div>
        <div className="fwe-col-12 fwe-col-sm-8 fwe-col-lg-6">
          <div className="cs-btn-group">
            <Button primary large>
              PART2cad
            </Button>
            <Button large>Email</Button>
            <Button disabled large>
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
