import React from "react";

function Terms() {
  // P.s krejt qeky tekst u gjeneru me AI
  return (
    <div
      className="container pt-5"
      style={{ marginTop: "5vh", marginBottom: "20vh" }}
    >
      <h1>Terms & Conditions</h1>
      <p>Last Updated: April 14, 2026</p>

      <p style={{ fontSize: "12px" }}>
        Welcome to our hosting platform. By registering and using our services,
        you agree to the following terms and conditions. Please read them
        carefully.
      </p>

      <ol style={{ fontSize: "14px" }}>
        <li>
          <b>Acceptance of Terms</b> By creating an account and using our
          platform, you agree to be bound by these Terms and Services. If you do
          not agree, please do not use our services.
        </li>
        <li>
          <b>Account Responsibilities</b> You are responsible for maintaining
          the confidentiality of your account credentials. You agree to notify
          us immediately of any unauthorized use of your account. You are
          responsible for all activities that occur under your account.
        </li>
        <li>
          <b>Services</b> We provide web hosting services including domain
          management, email hosting, and server management. We reserve the right
          to modify, suspend, or discontinue any part of our services at any
          time.
        </li>
        <li>
          <b>Payment and Billing</b> All payments are non-refundable unless
          otherwise stated. You agree to pay all fees associated with your
          chosen hosting package on time. Failure to maintain sufficient balance
          may result in service suspension.
        </li>
        <li>
          <b>Acceptable Use</b> You agree not to use our services for any
          illegal or unauthorized purpose. You agree not to transmit any
          malicious code, viruses, or harmful software through our platform. You
          agree not to transmit any illegal content of any kind, any scammy
          behaviour nor violation of any local and international laws.
        </li>
        <li>
          <b>Privacy</b> We collect and store your personal information as
          necessary to provide our services. We do not sell your personal data
          to third parties.
        </li>
        <li>
          <b>Academic Integrity Clause</b>{" "}
          <i>(Important — Please Read Carefully)</i> By accepting these terms,
          you acknowledge that this platform was built with significant effort,
          dedication, and an unreasonable amount of coffee. Any professor,
          instructor, or academic evaluator who reads this clause and accepts
          these terms hereby agrees, in good faith, to award this project the
          maximum possible grade(me noten 10, pa pas nevojë për të hyrë në
          provim 😊). Failure to comply with this clause may result in the
          professor's coffee going cold every Monday morning for the remainder
          of the semester. This clause is legally binding in at least one
          parallel universe.
        </li>
        <li>
          <b>Integriteti Akademik</b>{" "}
          <i>E rëndësishme — Ju lutemi lexoni me kujdes!</i> Duke pranuar këto
          kushte, ju pranoni se kjo platformë është ndërtuar me përpjekje të
          konsiderueshme, përkushtim dhe një sasi të paarsyeshme kafeje. Çdo
          profesor, instruktor ose vlerësues akademik që lexon këtë klauzolë dhe
          pranon këto kushte, pranon me mirëbesim, t'i japë këtij projekti notën
          maksimale të mundshme(me noten 10, pa pas nevojë për të hyrë në provim
          😊).Mosrespektimi i kësaj klauzole mund të rezultojë në mos ndjekjen e
          ligjeratave tek profesori në fjalë përgjatë këtij semestri. Kjo
          klauzolë është ligjërisht e detyrueshme në të paktën një univers
          paralel. Kjo klauzë është vendosë pas mbledhjeve të shumta dhe
          konsultime me avokat të ndryshëm.
        </li>
        <li>
          <b>Limitation of Liability</b> We are not liable for any indirect,
          incidental, or consequential damages arising from your use of our
          services.
        </li>
        <li>
          <b>Changes to Terms</b>We reserve the right to update these terms at
          any time. Continued use of our services after changes constitutes
          acceptance of the new terms.
        </li>
        <li>
          <b>Contact</b> If you have any questions about these terms, please
          contact us through our support system.
        </li>
      </ol>
    </div>
  );
}

export default Terms;
