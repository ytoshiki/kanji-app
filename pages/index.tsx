import Footer from "../components/Footer";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <div>
        <section>
          <SearchForm />
        </section>
        <section className="g-section is-md">
          <div className="g-container">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
              neque perferendis atque magni expedita aliquid ea quidem itaque
              esse doloremque minus culpa nesciunt, rem at reiciendis id
              pariatur dolores vitae.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
              maiores, officia omnis eaque voluptas sequi culpa id natus,
              mollitia expedita sed quas soluta dolore vel laudantium tempore a
              perspiciatis! Quidem?
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
