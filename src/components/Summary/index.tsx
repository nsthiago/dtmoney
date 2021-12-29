import { Container } from './styles';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {
    const { transactions } = useTransactions();

    const summary = transactions.reduce((accumulator, transaction) => {

        if (transaction.type === 'deposit') {
            accumulator.deposits += transaction.amount;
            accumulator.total += transaction.amount;
        }
        else {
            accumulator.withdraws += transaction.amount
            accumulator.total -= transaction.amount;
        }

        return accumulator;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    });

    function formatCurrency(value: number): string {
        const formatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)

        return formatted;
    }

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>{formatCurrency(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <p>Saidas</p>
                    <img src={outcomeImg} alt="Entradas" />
                </header>
                <strong> -{formatCurrency(summary.withdraws)}</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>{formatCurrency(summary.total)}</strong>
            </div>
        </Container>
    )
}